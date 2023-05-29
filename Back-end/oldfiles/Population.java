package oldfiles;

import java.util.ArrayList;
import java.util.Random;

import org.json.JSONArray;
import org.json.JSONObject;

public class Population {
    static int POP_SIZE = 10;

    public ArrayList<Individual> individuals = new ArrayList<Individual>();
    public int current_semester;  
    
    public static int objetive;
    public static int generation;
    public static final int SWITCH_RATE = 80;
    public static final int MUT_RATE = 95;
    public static final int MAX_LOOPS = 100;
    public static final int MIN_VALUE = -99999;
    public static final int GERATORS_SIZE = 5;

    public Course course;

    public void init_pop(){
    
        generation = 0;
        objetive = course.optionalWorkload + course.requiredWorkload;

        for(int i = 0; i < POP_SIZE; i++){
            
            Individual individual = new Individual();
            individual.workloadOptional = 0;
            individual.workloadRequired = 0;

            // --- CLONAR O ARRAYLIST SUBJECTS PARA CADA INDIVIDUO ---
            for (Subject element : course.subjects) {
                if(!Subject.subjectInArray(element, User.auth.discipline_list)){
                    individual.subjects.add(Subject.cloneSubject(element));
                }
                else{
                    individual.workloadRequired +=  element.workload;
                }
            }

            for (Subject element : course.optional_subjects) {
                if(!Subject.subjectInArray(element, User.auth.discipline_list)){
                    individual.optionalSubjects.add(Subject.cloneSubject(element));
                }
                else{
                    individual.workloadOptional +=  element.workload;
                }
            }
            // ---
            int currentSemester = User.auth.currentSemester;
            
            while((individual.workloadRequired + individual.workloadOptional) < objetive){
                currentSemester = currentSemester + 1;
                if(individual.workloadRequired < course.requiredWorkload){
                    for(int l = 0; l < individual.subjects.size(); l++){
                        if(Individual.allRequeriments(individual.subjects.get(l), individual.genes, currentSemester)){
                            individual.subjects.get(l).semester = currentSemester;
                            individual.genes.add(individual.subjects.get(l));
                            individual.workloadRequired += individual.subjects.get(l).workload;
                            individual.subjects.remove(individual.subjects.get(l));
                            l--;
                        }      
                    }
                }
                if(individual.workloadOptional < course.optionalWorkload){
                    for(int l = 0; l < individual.optionalSubjects.size(); l++){
                        if(Subject.check_time(individual.optionalSubjects.get(l), individual.genes, currentSemester)){
                            individual.genes.add(individual.optionalSubjects.get(l));
                            individual.optionalSubjects.get(l).semester = currentSemester;
                            individual.workloadOptional += individual.optionalSubjects.get(l).workload;
                            individual.optionalSubjects.remove(individual.optionalSubjects.get(l));
                            l--;
                        }
                    }
                }
            }
            this.individuals.add(individual);
        }
    }

    public Population sort(Population population){
        ArrayList<Individual> individuals = new ArrayList<Individual>();
        for(int i = 0; i < population.individuals.size(); i++){
            int bigger = 0;
            for(int j = i + 1; j < population.individuals.size(); j++){
                if(population.individuals.get(j).fitness > population.individuals.get(bigger).fitness){
                    bigger = j;
                }
            }
            individuals.add(population.individuals.get(bigger));
            population.individuals.remove(population.individuals.get(bigger));
            i--;
        }

        population.individuals = individuals;
        return population;
    }   

    public Population fitness(Population population){
        for(Individual individual: population.individuals){
            individual.fitness = 0;
            for(Subject gen: individual.genes){
                if(gen.semester > course.max_semester){
                    individual.fitness += MIN_VALUE;
                    break;
                }
                individual.fitness += gen.workload;
            }
        }
        return population;
    }

    public Population select_gerators(Population population, Population gerators){
        for(int i = 0; i < GERATORS_SIZE; i++){
            gerators.individuals.add(population.individuals.get(i));
        }
        return gerators;
    }

    public Population switch_(Population generators, Population descendants){
        for (Individual generator : generators.individuals) {
            Random random = new Random();
            int rate = random.nextInt(100);
            if(rate < SWITCH_RATE){
                Individual newIndividual = Individual.cloneIndividual(generator);
                for(Subject subject : newIndividual.genes){
                    rate = random.nextInt(2);
                    if(rate == 1){
                        ArrayList<Subject> subjectsSameTime = Subject.getSubjectWithSameTime(subject, newIndividual.genes);
                        if(!subjectsSameTime.isEmpty()){
                            int indexRandom = random.nextInt(subjectsSameTime.size());
                            if(Individual.check_requirements(subject, newIndividual.genes, subjectsSameTime.get(indexRandom).semester)
                            && Individual.check_requirements(subjectsSameTime.get(indexRandom), newIndividual.genes, subject.semester)){
                                int semesterAux = subject.semester;
                                subject.semester = subjectsSameTime.get(indexRandom).semester;
                                subjectsSameTime.get(indexRandom).semester = semesterAux;
                            }   
                        }
                    }
                }
                newIndividual.genes = Subject.sortSubjects(newIndividual.genes);
                descendants.individuals.add(newIndividual);
            }
        }
        return descendants;
    }

    public void substitution(Population descendants){
        Population oldPopulation = new Population();
        for (Individual individual : this.individuals) {
            oldPopulation.individuals.add(Individual.cloneIndividual(individual));
        }
        int index_oldPopulation = 0, index_descendants = 0;
        for(int i = 0; i < POP_SIZE; i++){
            if(index_descendants < descendants.individuals.size()){
                if(oldPopulation.individuals.get(index_oldPopulation).fitness > descendants.individuals.get(index_descendants).fitness){
                    this.individuals.add(oldPopulation.individuals.get(index_oldPopulation));
                    index_oldPopulation = index_oldPopulation+1;
                }
                else{
                    this.individuals.add(descendants.individuals.get(index_descendants));
                    index_descendants = index_descendants+1;
                }
            }
            else this.individuals.add(oldPopulation.individuals.get(index_descendants));
        }
    }

    public String start(Course course) {

        this.course = course;

        this.course.subjects = Subject.sortSubjects(this.course.subjects);
        
        // --- INICIAR POPULAÇÃO ---
        init_pop();
        
        // ---   
        // --- CALCULAR ADAPTAÇÃO ---
        fitness(this);
        //---
        // --- ORDENAR POPULAÇÃO ---
        sort(this);
        // ---
        while(generation < MAX_LOOPS){
            Population generators = new Population();
            Population descendants = new Population();
            // --- ESCOLHER PAIS ---
            select_gerators(this, generators);
            // --- ---
            // --- OPERAÇÕES ---
            switch_(generators, descendants);
            // ---
            fitness(descendants);
    
            sort(descendants);
    
            substitution(descendants);
            generation++;
        }

        JSONArray jsonArray = new JSONArray();
        
        for (Subject subject : this.individuals.get(0).genes) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("name", subject.name);
            jsonObject.put("code", subject.code);
            jsonObject.put("semester", subject.semester);
            JSONArray jsonArrayTime = new JSONArray();
            for(Time time: subject.times){
                JSONObject jsonObject2 = new JSONObject();
                jsonObject2.put("hour", time.hour);
                jsonObject2.put("day", time.day);
                jsonArrayTime.put(jsonObject2);
            }
            jsonObject.put("time", jsonArrayTime);


            jsonArray.put(jsonObject);
        }
        String jsonString = jsonArray.toString(4);

        return jsonString;
    }
}
