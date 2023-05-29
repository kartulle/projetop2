package oldfiles;

import java.util.ArrayList;
import java.util.Optional;

import org.json.JSONArray;
import org.json.JSONObject;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.IOException;

public class Course {
    static private Integer courseCount = 0;
    static private ArrayList<Course> courses = new ArrayList<Course>();

    // --- TODAS AS DISCIPLINAS OBRIGATÓRIAS  ---
    public ArrayList<Subject> subjects = new ArrayList<Subject>();

    // --- TODAS AS DISCIPLINAS ELETIVAS ---
    public ArrayList<Subject> optional_subjects = new ArrayList<Subject>();

    public int optionalWorkload;
    public int requiredWorkload;

    public int max_semester;

    private Integer id;
    private String name;

    private Course(String name) {
        this.name = name;
        this.id = ++courseCount;
    }

    public String getName() {
        return this.name;
    }
    
    static public String getJsonString() {             
        JSONArray jsonArray = new JSONArray();
        for (Course course : courses) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("name", course.getName());
            jsonObject.put("id", course.getId());
            jsonArray.put(jsonObject);
        }
        return jsonArray.toString();
    }

    static public ArrayList<Course> getAllCourses() {
        return courses;
    }

    public Number getId() {
        return this.id;
    }

    static public Course getByName(String name) {
        return courses.stream().filter(course -> course.name.equals(name)).findFirst().get();
    }

    static public Course getCourse(Integer courseId) {
        for (Course course : courses) {
            if (course.getId().equals(courseId)) {
                return course;
            }
        }
        return null;
    }

    static public void create(String name) {
        try{
            if(name.isEmpty()){
            // Lançar uma exceção customizada ou uma exceção existente
              throw new IllegalArgumentException("Campo nome não foi preenchido.");
            }
            Course newCourse = new Course(name);
            courses.add(newCourse);
        }catch(IllegalArgumentException e){
            System.out.print("Erro:" + e);
        }
    }

    public void edit(String name) {
        try{
            if(name.isEmpty()){
                // Lançar uma exceção customizada ou uma exceção existente
                throw new IllegalArgumentException("Campo nome não foi preenchido.");
            }
            this.name = name;
        }catch(IllegalArgumentException e){
            System.out.print("Erro:" + e);
        }
    }

    public void delete() {
        this.subjects.forEach(subject -> subject.delete());
        courses.remove(this);
    }

    public void addSubject(Subject subject) {
        if(subject.optional){
            this.optional_subjects.add(subject);
        }
        else{
            this.subjects.add(subject);
        }
    }

    public void addSubjectById(Integer subjectId) {
        Optional<Subject> subject = Subject.getSubjects().stream().filter(subject1 -> subject1.getId() == subjectId)
                .findFirst();

        if (!subject.isPresent()) {
            System.out.println("Matéria não encontrada");
            return;
        }

        this.subjects.add(subject.get());
    }

    static public void addSubjectById(Integer courseId, Integer subjectId) {
        Optional<Subject> subject = Subject.getSubjects().stream().filter(subject1 -> subject1.getId() == subjectId)
                .findFirst();

        if (!subject.isPresent()) {
            System.out.println("Matéria não encontrada");
            return;
        }

        Course course = Course.getCourse(courseId);
        if(course == null) {
            System.out.println("Curso não encontrado");
            return;
        }

        if(!course.hasSubject(subject.get())) {
            course.addSubject(subject.get());
        }
    }

    static public void removeSubjectById(Integer courseId, Integer subjectId) {
        Optional<Subject> subject = Subject.getSubjects().stream().filter(subject1 -> subject1.getId() == subjectId)
                .findFirst();

        if (!subject.isPresent()) {
            System.out.println("Matéria não encontrada");
            return;
        }

        Course course = Course.getCourse(courseId);
        if(course == null) {
            System.out.println("Curso não encontrado");
            return;
        }

        if(course.hasSubject(subject.get())) {
            course.removeSubject(subject.get());
        }
    }

    static public ArrayList<Subject> getCourseSubjects(Integer courseId) {
        Course course = getCourse(courseId);
        if (course != null) {
            return course.subjects;
        } else {
            return null;
        }
    }

    public boolean hasSubject(Subject subject) {
        return subjects.contains(subject);
    }
        
    public void removeSubject(Subject subject) {
        this.subjects.remove(subject);
    }

    public void removeSubjectById(Integer subjectId) {
        Optional<Subject> subject = this.subjects.stream().filter(subject1 -> subject1.getId() == subjectId)
                .findFirst();

        if (!subject.isPresent()) {
            System.out.println("Matéria não encontrada");
            return;
        }

        this.subjects.remove(subject.get());
    }

    public static void createCourseFromFile() {
        try {
            String jsonStr = new String(Files.readAllBytes(Paths.get("oldfiles/course.json")));
            JSONObject jsonObj = new JSONObject(jsonStr);

            String courseName = jsonObj.getString("name");
            Course newCourse = new Course(courseName);
            User.auth.course = courseName;

            int courseOptionalWorkload = jsonObj.getInt("optional workload");
            newCourse.optionalWorkload = courseOptionalWorkload;
            
            int courseRequiredWorkload = jsonObj.getInt("required workload");
            newCourse.requiredWorkload = courseRequiredWorkload;

            int courseMaxSemester = jsonObj.getInt("max semester");
            newCourse.max_semester = courseMaxSemester;

            JSONArray subjectsArr = jsonObj.getJSONArray("subjects");
            for (int i = 0; i < subjectsArr.length(); i++) {
                JSONObject subjectObj = subjectsArr.getJSONObject(i);

                Subject newSubject = new Subject(
                        subjectObj.getString("name"),
                        subjectObj.getString("code"),
                        subjectObj.getInt("semester"),
                        subjectObj.getInt("workload"),
                        subjectObj.getBoolean("optional")
                        );

                JSONArray subjectsArrRequirements = subjectObj.getJSONArray("requirements");

                // --- ADICIONAR PRE-REQUISITOS ---
                for (int j = 0; j < subjectsArrRequirements.length(); j++) {
                    JSONObject subjectObjRequirements = subjectsArrRequirements.getJSONObject(j);
    
                    Subject newSubjectRequirements = new Subject(
                                subjectObjRequirements.getString("code")
                            );
                    newSubject.addRequirements(newSubjectRequirements);
                }

                JSONArray subjectsArrTimes = subjectObj.getJSONArray("time");


                // --- ADICIONAR HORÁRIOS ---
                for (int j = 0; j < subjectsArrTimes.length(); j++) {
                    JSONObject subjectObjTimes = subjectsArrTimes.getJSONObject(j);
    
                    Time newSubjectRequirements = new Time(
                                subjectObjTimes.getString("day"),
                                subjectObjTimes.getInt("hour")
                            );
                    newSubject.addTimes(newSubjectRequirements);
                }
                newCourse.addSubject(newSubject);
                newSubject.save();
            }
            courses.add(newCourse);
        } catch (IOException e) {
            System.out.println("Erro durante a leitura do arquivo: " + e.getMessage() + "\n");
        } 
    }
}
