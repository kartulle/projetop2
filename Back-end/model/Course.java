package model;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;

public class Course {

    private Integer id;
    private String name;
    public int optionalWorkload;
    public int requiredWorkload;
    public int max_semester;
    public ArrayList<Subject> subjects = new ArrayList<Subject>();
    public ArrayList<Subject> optional_subjects = new ArrayList<Subject>();

    public Course(Integer id, String name, int optionalWorkload, int requiredWorkload, int max_semester) {
        this.id = id;
        this.name = name;
        this.optionalWorkload = optionalWorkload;
        this.requiredWorkload = requiredWorkload;
        this.max_semester = max_semester;
    }

    public Course(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getOptionalWorkload() {
        return optionalWorkload;
    }

    public void setOptionalWorkload(int optionalWorkload) {
        this.optionalWorkload = optionalWorkload;
    }

    public int getRequiredWorkload() {
        return requiredWorkload;
    }

    public void setRequiredWorkload(int requiredWorkload) {
        this.requiredWorkload = requiredWorkload;
    }

    public int getMax_semester() {
        return max_semester;
    }

    public void setMax_semester(int max_semester) {
        this.max_semester = max_semester;
    }

    public ArrayList<Subject> getSubjects() {
        return subjects;
    }

    public void setSubjects(ArrayList<Subject> subjects) {
        this.subjects = subjects;
    }

    public ArrayList<Subject> getOptional_subjects() {
        return optional_subjects;
    }

    public void setOptional_subjects(ArrayList<Subject> optional_subjects) {
        this.optional_subjects = optional_subjects;
    }

    public JSONObject getJsonString() {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("name", this.name);
        jsonObject.put("id", this.id);
        return jsonObject;
    }
}
