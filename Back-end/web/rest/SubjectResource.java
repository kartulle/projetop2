package web.rest;

import com.sun.net.httpserver.HttpExchange;
import dao.SubjectDao;
import dao.impl.SubjectDaoImpl;
import model.Subject;
import org.json.JSONObject;
import org.json.JSONTokener;
import service.SubjectService;
import service.impl.SubjectServiceImpl;

import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

public class SubjectResource {

    SubjectDao subjectDao = new SubjectDaoImpl();
    SubjectService subjectService = new SubjectServiceImpl(subjectDao);

    public String getAllSubject(){
        return subjectService.getAllSubject();
    }

    public String createSubject(HttpExchange exchange) {
        JSONObject responseJson = new JSONObject();
        try {
            InputStreamReader reader = new InputStreamReader(exchange.getRequestBody(), "utf-8");
            JSONObject json = new JSONObject(new JSONTokener(reader));
            String name = json.getString("name");
            String code = json.getString("code");
            Integer semester = Integer.parseInt(json.getString("semester"));
            Integer workload = Integer.parseInt(json.getString("workload"));
            Boolean optional = Boolean.parseBoolean(json.getString("optional"));
            String active = json.getString("active");
            String courseId = json.getString("courseId");

            Subject subject = new Subject(name,code, semester, workload, optional);
            subjectService.createSubject(subject);
            responseJson.put("message", "Materia creada");
            return responseJson.toString();
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    public String updateSubject(HttpExchange exchange) {
        try {
            InputStreamReader reader = new InputStreamReader(exchange.getRequestBody(), "utf-8");
            JSONObject json = new JSONObject(new JSONTokener(reader));
            String uri = exchange.getRequestURI().toString();

            int idSubject = Integer.parseInt(uri.substring(uri.lastIndexOf('/') + 1));
            String name = json.getString("name");
            String code = json.getString("code");
            Integer semester = Integer.parseInt(json.getString("semester"));
            Integer workload = Integer.parseInt(json.getString("workload"));
            Boolean optional = Boolean.parseBoolean(json.getString("optional"));
            String active = json.getString("active");

            Subject subject = new Subject(name,code, semester, workload, optional);
            subject.setId(idSubject);
            subjectService.updateSubject(subject);

            JSONObject responseJson = new JSONObject();
            responseJson.put("message", "Course updated");
            return responseJson.toString();
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    public String deleteSubject(HttpExchange exchange) {
        String uri = exchange.getRequestURI().toString();
        int idSubject = Integer.parseInt(uri.substring(uri.lastIndexOf('/') + 1));

        subjectService.removeSubject(idSubject);

        JSONObject responseJson = new JSONObject();
        responseJson.put("message", "Subject deleted");

        return responseJson.toString();
    }
}
