package model;

import org.json.JSONObject;

import java.util.ArrayList;

public class Subject {

    public Integer id;
    public String name;
    public String code;
    public Integer semester;
    public Integer workload;
    public boolean optional;
    public ArrayList<Subject> requirements = new ArrayList<Subject>();
    public ArrayList<Time> times = new ArrayList<Time>();

    public Subject(String name, String code, Integer semester, Integer workload, boolean optional) {
        this.name = name;
        this.code = code;
        this.semester = semester;
        this.workload = workload;
        this.optional = optional;
    }
    public Subject(Integer id, String name, String code, Integer semester, Integer workload, boolean optional) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.semester = semester;
        this.workload = workload;
        this.optional = optional;
    }
    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCode() {
        return code;
    }

    public Integer getSemester() {
        return semester;
    }

    public Integer getWorkload() {
        return workload;
    }

    public boolean isOptional() {
        return optional;
    }

    public ArrayList<Subject> getRequirements() {
        return requirements;
    }

    public ArrayList<Time> getTimes() {
        return times;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public void setWorkload(Integer workload) {
        this.workload = workload;
    }

    public void setOptional(boolean optional) {
        this.optional = optional;
    }

    public void setRequirements(ArrayList<Subject> requirements) {
        this.requirements = requirements;
    }

    public void setTimes(ArrayList<Time> times) {
        this.times = times;
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

}
