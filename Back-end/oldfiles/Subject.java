package oldfiles;

import java.util.ArrayList;
import org.json.JSONObject;
import org.json.JSONArray;


public class Subject {
    static int subjectCounter = 0;

    static private ArrayList<Subject> subjects = new ArrayList<Subject>();

    // --- DISCIPLINAS PRE-REQUISITADAS ---
    // --- GENERICS ---
    public ArrayList<Subject> requirements = new ArrayList<Subject>();

    // --- DISCIPLINAS PRE-REQUISITADAS ---
    public ArrayList<Time> times = new ArrayList<Time>();

    public Integer id;
    public String name;
    public String code;
    public Integer semester;
    public Integer workload;
    public boolean optional;

    //  --- OVERLOADING ---
    public Subject(
        String name, 
        String code,
        Integer semester,
        Integer workload,
        boolean optional
    ) {
        this.id = ++subjectCounter;
        this.name = name;
        this.code = code;
        this.semester = semester;
        this.workload = workload;
        this.optional = optional;
    }

    public Subject(String name, String code) {
        this.id = ++subjectCounter;
        this.name = name;
        this.code = code;
    }
    public Subject(String code) {
        this.code = code;
    }

    public Subject(String name, String code, Integer semester, Integer workload) {
        this.id = ++subjectCounter;
        this.name = name;
        this.code = code;
        this.semester = semester;
        this.workload = workload;
    }

    static public ArrayList<Subject> sortSubjects(ArrayList<Subject> subjects){
        ArrayList<Subject> newSubjects = new ArrayList<Subject>();
        for(int i = 0; i < subjects.size(); i++){
            int lower = 0;
            for(int j = i + 1; j < subjects.size(); j++){
                if(subjects.get(j).semester < subjects.get(lower).semester){
                    lower = j;
                }
            }
            newSubjects.add(subjects.get(lower));
            subjects.remove(subjects.get(lower));
            i--;
        }
        subjects = newSubjects;
        return subjects;
    }

    static public boolean subjectInArray(Subject subject, ArrayList<Subject> subjects){
        for(Subject element: subjects){
            if(subject.code.equals(element.code)){
                return true;
            }
        }
        return false;
    }

    static public boolean check_time(Subject subject, ArrayList<Subject> subjects, int current_semester){
        for(Subject subj_element: subjects){
            if(subj_element.semester == current_semester){
                for(Time time: subject.times){
                    if(Time.timeInArray(time, subj_element.times)){
                        return false;
                    }
                }
            }
        }
        return true;
    }
    

    static public Subject getSubjectByCode(ArrayList<Subject> subjects, String code){
        for(Subject element: subjects){
            if(element.code.equals(code)){
                return element;
            }
        }
        return null;
    }

    static public Subject cloneSubject(Subject subject){
        Subject newSubject = new Subject(subject.name, subject.code, subject.semester, subject.workload, subject.optional);

        for(Subject requeriment : subject.requirements){
            newSubject.requirements.add(requeriment);
        }

        for(Time time : subject.times){
            newSubject.times.add(time);
        }

        return newSubject;
    }

    public JSONObject getJsonString() {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("id", this.id);
        jsonObject.put("name", this.name);
        jsonObject.put("code", this.code);
        jsonObject.put("semester", this.semester);
        jsonObject.put("workload", this.workload);
        jsonObject.put("optional", this.optional);
        return jsonObject;
    }
    static public String getAllSubjectsJson() {             
        JSONArray jsonArray = new JSONArray();
        for (Subject subject : subjects) {
            jsonArray.put(subject.getJsonString());
        }
        return jsonArray.toString();
    }

    static public Subject get(Integer id) {
        return subjects.stream().filter(subject -> subject.id == id).findFirst().get();
    }

    static public void create(String name, String code) {
        try{
            if(name.isEmpty() || code.isEmpty()){
                // Lançar uma exceção customizada ou uma exceção existente
                throw new IllegalArgumentException("Campos obrigatórios não preenchidos.");
            }
            Subject newSubject = new Subject(name, code);
            subjects.add(newSubject);
        }catch(IllegalArgumentException e){
            System.out.print("Erro:" + e);
        }
    }

    static public Integer create(String name, 
        String code,
        Integer semester,
        Integer workload,
        boolean optional,
        boolean active
    ) {
        try{
            if(name.isEmpty() || code.isEmpty()){
                // Lançar uma exceção customizada ou uma exceção existente
                throw new IllegalArgumentException("Campo nome não foi preenchido.");
            }
            Integer subjectId = subjectCounter + 1;
            Subject newSubject = new Subject(
                name,
                code,
                semester,
                workload,
                optional
            );
            subjects.add(newSubject);
            return subjectId;
        }catch(IllegalArgumentException e){
            System.out.print("Erro:" + e);
            return 0;
        }
    }

    public void addRequirements(Subject subject) {
        this.requirements.add(subject);
    }
    public void addTimes(Time time) {
        this.times.add(time);
    }

    public Integer getId() {
        return this.id;
    }

    static public ArrayList<Subject> getSubjects() {
        return subjects;
    }

    public void save() {
        subjects.add(this);
    }

    public void edit(String name, String code) {
        try{
            if(name.isEmpty() || code.isEmpty()){
                // Lançar uma exceção customizada ou uma exceção existente
                throw new IllegalArgumentException("Campos obrigatórios não foram preenchidos.");
            }
            this.name = name;
            this.code = code;
        }catch(IllegalArgumentException e){
            System.out.print("Erro:" + e);
        }
    }

    public void edit(
        String name, 
        String code,
        Integer semester,
        Integer workload,
        boolean optional,
        boolean active
    ) {
        try{
            if(name.isEmpty() || code.isEmpty()){
                // Lançar uma exceção customizada ou uma exceção existente
                throw new IllegalArgumentException("Campos obrigatórios não foram preenchidos.");
            }
            this.name = name; 
            this.code = code;
            this.semester = semester;
            this.workload = workload;
            this.optional = optional;
        }catch(IllegalArgumentException e){
            System.out.print("Erro:" + e);
        }
    }

    public void delete() {
        Course.getAllCourses().forEach(course -> {
            if(course.hasSubject(this)) {
                course.removeSubject(this);
            }
        });
        
        subjects.remove(this);
    }

    static public ArrayList<Subject> getSubjectWithSameTime(Subject subject, ArrayList<Subject> subjects){
        ArrayList<Subject> newSubjects = new ArrayList<Subject>();
        for(Subject element: subjects){
            if(Time.timeIsEqual(element.times, subject.times) && !element.code.equals(subject.code)){
                newSubjects.add(element);
            }
        }
        return newSubjects;
    }
}
