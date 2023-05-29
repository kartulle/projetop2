package oldfiles;

import java.util.ArrayList;

public class Individual extends Population{
    static int MAX_SUBJECTS_PER_SEMESTER = 8;
    public ArrayList<Subject> genes = new ArrayList<Subject>();
    public ArrayList<Subject> subjects =  new ArrayList<Subject>();
    public ArrayList<Subject> optionalSubjects =  new ArrayList<Subject>();
    public int fitness;
    public int workloadRequired;
    public int workloadOptional;

    static public Individual cloneIndividual(Individual individual){
        Individual newIndividual = new Individual();
        newIndividual.fitness = individual.fitness;
        for (Subject subject : individual.genes) {
            newIndividual.genes.add(Subject.cloneSubject(subject));
        }
        for (Subject subject : individual.subjects) {
            newIndividual.subjects.add(Subject.cloneSubject(subject));
        }
        for (Subject subject : individual.optionalSubjects) {
            newIndividual.optionalSubjects.add(Subject.cloneSubject(subject));
        }
        return newIndividual;
    }

    static public boolean check_requirements(Subject subject, ArrayList<Subject> subjects, int current_semester){
        for(Subject requirement: subject.requirements){
            if(!Subject.subjectInArray(requirement, User.auth.discipline_list)){
                if((!Subject.subjectInArray(requirement, subjects) || Subject.getSubjectByCode(subjects, requirement.code).semester >= current_semester)){
                    return false;
                }
            }
        }
        return true;
    }

    static public boolean allRequeriments(Subject subject, ArrayList<Subject> subjects, int current_semester){
        if(check_requirements(subject, subjects, current_semester) && Subject.check_time(subject, subjects, current_semester)){
            return true;
        }
        return false;
    }

    
}
