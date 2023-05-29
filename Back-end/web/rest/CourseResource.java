package web.rest;

import com.sun.net.httpserver.HttpExchange;
import dao.CourseDao;
import dao.impl.CourseDaoImpl;
import model.Course;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;
import service.CourseService;
import service.impl.CourseServiceImpl;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;

public class CourseResource {
    CourseDao courseDao = new CourseDaoImpl();
    CourseService courseService = new CourseServiceImpl(courseDao);

    public String getAllCourse() {
        return courseService.getAllCourse();
    }

    public String createCourse(HttpExchange exchange) {
        JSONObject responseJson = new JSONObject();
        try {
            InputStreamReader reader = new InputStreamReader(exchange.getRequestBody(), "utf-8");
            JSONObject json = new JSONObject(new JSONTokener(reader));
            String name = json.getString("name");
            if (name.isEmpty()) {
                throw new IllegalArgumentException("Campos obrigatórios não foram preenchidos.");
            }
            courseService.createCourse(new Course(name));
            responseJson.put("message", "Curso Criado");
            return responseJson.toString();
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    public String updateCourse(HttpExchange exchange) {

        JSONObject responseJson = new JSONObject();
        String uri = exchange.getRequestURI().toString();

        try {
            InputStreamReader reader = new InputStreamReader(exchange.getRequestBody(), "utf-8");
            JSONObject json = new JSONObject(new JSONTokener(reader));
            int idCourse = Integer.parseInt(uri.substring(uri.lastIndexOf('/') + 1));
            String name = json.getString("name");
            if (name.isEmpty()) {
                throw new IllegalArgumentException("Campos obrigatórios não foram preenchidos.");
            }
            courseService.updateCourse(idCourse, new Course(name));

            responseJson.put("message", "Curso atualizado");

            return responseJson.toString();

        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }

    }

    public String deleteCourse(HttpExchange exchange) {
        JSONObject responseJson = new JSONObject();
        String uri = exchange.getRequestURI().toString();

        try {
            InputStreamReader reader = new InputStreamReader(exchange.getRequestBody(), "utf-8");
            int idCourse = Integer.parseInt(uri.substring(uri.lastIndexOf('/') + 1));
            courseService.removeCourse(idCourse);
            responseJson.put("message", "Curso atualizado");
            return responseJson.toString();

        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    public String getSubjects(HttpExchange exchange) {
        try {
            InputStreamReader reader = new InputStreamReader(exchange.getRequestBody(), "utf-8");
            String uri = exchange.getRequestURI().toString();

            int courseId = Integer.parseInt(uri.substring(uri.lastIndexOf('/') + 1));
            return courseService.getSubjects(courseId);
        }catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }


    }

    public String addSubjectToCourse(HttpExchange exchange) {
        JSONObject responseJson = new JSONObject();
        try {
            InputStreamReader reader = new InputStreamReader(exchange.getRequestBody(), "utf-8");
            JSONObject json = new JSONObject(new JSONTokener(reader));
            Integer subjectId = Integer.parseInt(json.getString("subjectId"));
            Integer courseId = Integer.parseInt(json.getString("courseId"));

            courseService.addSubjectToCourse(courseId, subjectId);

            responseJson.put("message", "Subject added");

            return responseJson.toString();

        }catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }


    public String removeSubjectFromCourse(HttpExchange exchange) {
        try {
            InputStreamReader reader = new InputStreamReader(exchange.getRequestBody(), "utf-8");
            JSONObject json = new JSONObject(new JSONTokener(reader));
            Integer subjectId = Integer.parseInt(json.getString("subjectId"));
            Integer courseId = Integer.parseInt(json.getString("courseId"));

            courseService.removeSubjectFromCourse(subjectId,courseId);

            JSONObject responseJson = new JSONObject();
            responseJson.put("message", "Subject removed");

            return responseJson.toString();
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }
}
