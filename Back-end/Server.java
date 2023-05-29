import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;

import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.InetSocketAddress;

import java.util.ArrayList;

import command.usercommand.*;
import datamock.Mock;
import oldfiles.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import web.rest.AuthResource;
import web.rest.CourseResource;
import web.rest.SubjectResource;
import web.rest.UserResource;


public class Server {
    public static void main(String[] args) throws Exception {

        Database.start();
        Mock.start();

        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);

        System.out.printf("\n\nRunning Server in: 127.0.0.1:8000\n\n");

        // --- ROTAS ---

        server.createContext("/users", new HttpHandler() {
            UserResource userResource = new UserResource();
            UserExecutor userExecutor = new UserExecutor();
            @Override
            public void handle(HttpExchange exchange) throws IOException {
                String requestMethod = exchange.getRequestMethod();

                if (requestMethod.equalsIgnoreCase("GET")) {
                    sendResponse(exchange, userExecutor.executeOperation(new UserGetCommand(), exchange));
                } else if (requestMethod.equalsIgnoreCase("POST")) {
                    sendResponse(exchange, userExecutor.executeOperation(new UserPostCommand(), exchange));
                } else if (requestMethod.equalsIgnoreCase("PUT")) {
                    sendResponse(exchange, userExecutor.executeOperation(new UserPutCommand(), exchange));
                } else if (requestMethod.equalsIgnoreCase("DELETE")) {
                    sendResponse(exchange, userExecutor.executeOperation(new UserDelCommand(), exchange));
                } else {
                    sendResponse(exchange, "Invalid request method");
                }
            }
        });

        server.createContext("/courses", new HttpHandler() {
            CourseResource courseResource = new CourseResource();
            @Override
            public void handle(HttpExchange exchange) throws IOException {
                String requestMethod = exchange.getRequestMethod();
                if (requestMethod.equalsIgnoreCase("GET")) {
                    sendResponse(exchange, courseResource.getAllCourse());
                } else if (requestMethod.equalsIgnoreCase("POST")) {
                    sendResponse(exchange, courseResource.createCourse(exchange));
                } else if (requestMethod.equalsIgnoreCase("PUT")) {
                    sendResponse(exchange, courseResource.updateCourse(exchange));
                } else if (requestMethod.equalsIgnoreCase("DELETE")) {
                    sendResponse(exchange, courseResource.deleteCourse(exchange));
                } else {
                    sendResponse(exchange, "Invalid request method");
                }
            }
        });

        server.createContext("/courses/subjects", new HttpHandler() {
            CourseResource courseResource = new CourseResource();
            @Override
            public void handle(HttpExchange exchange) throws IOException {
                String requestMethod = exchange.getRequestMethod();
                if (requestMethod.equalsIgnoreCase("GET")) {
                    sendResponse(exchange,courseResource.getSubjects(exchange));
                } else if (requestMethod.equalsIgnoreCase("POST")) {
                    sendResponse(exchange,courseResource.addSubjectToCourse(exchange));
                } else if (requestMethod.equalsIgnoreCase("DELETE")) {
                    sendResponse(exchange,courseResource.removeSubjectFromCourse(exchange));
                } else {
                    sendResponse(exchange, "Invalid request method");
                }
            }
        });

        server.createContext("/subjects", new HttpHandler() {
            SubjectResource subjectResource = new SubjectResource();
            @Override
            public void handle(HttpExchange exchange) throws IOException {
                String requestMethod = exchange.getRequestMethod();
                if (requestMethod.equalsIgnoreCase("GET")) {
                    sendResponse(exchange,subjectResource.getAllSubject());
                } else if (requestMethod.equalsIgnoreCase("POST")) {
                    sendResponse(exchange,subjectResource.createSubject(exchange));
                } else if (requestMethod.equalsIgnoreCase("PUT")) {
                    sendResponse(exchange,subjectResource.updateSubject(exchange));
                } else if (requestMethod.equalsIgnoreCase("DELETE")) {
                    sendResponse(exchange,subjectResource.deleteSubject(exchange));
                } else {
                    sendResponse(exchange, "Invalid request method");
                }
            }
        });



        server.createContext("/createCoursesFromFile", new HttpHandler() {
            @Override
            public void handle(HttpExchange exchange) throws IOException {
                String requestMethod = exchange.getRequestMethod();

                if (requestMethod.equalsIgnoreCase("POST")) {
                    handleCreateCourseFromFile(exchange);
                }
            }
            private void handleCreateCourseFromFile(HttpExchange exchange) throws IOException {
                Course.createCourseFromFile();
                JSONObject responseJson = new JSONObject();
                responseJson.put("message", "Couse created successfully");
                sendResponse(exchange, responseJson.toString());
            }
        });

        server.createContext("/system", new HttpHandler() {
            @Override
            public void handle(HttpExchange exchange) throws IOException {
                String requestMethod = exchange.getRequestMethod();
                if (requestMethod.equalsIgnoreCase("GET")) {
                    handleSystem(exchange);
                }
            }

            private void handleSystem(HttpExchange exchange) throws IOException {
                Population pop = new Population();
                sendResponse(exchange, pop.start(Course.getByName(User.auth.course)));
            }
        });

        server.createContext("/auth", new HttpHandler() {
            AuthResource authResource = new AuthResource();
            @Override
            public void handle(HttpExchange exchange) throws IOException {
                String requestMethod = exchange.getRequestMethod();
                if (requestMethod.equalsIgnoreCase("GET")) {
                } else if (requestMethod.equalsIgnoreCase("POST")) {
                    sendResponse(exchange,authResource.authenticateUser(exchange));
                } else {
                    sendResponse(exchange, "Invalid request method");
                }
            }
        });

        server.setExecutor(null); // default executor
        server.start();
    }


    static void sendResponse(HttpExchange httpExchange, String response) throws IOException {
        byte[] bytes = response.getBytes("UTF-8");
        // add CORS headers

        Headers headers = httpExchange.getResponseHeaders();
        headers.add("Access-Control-Allow-Origin", "*");
        headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization");

        httpExchange.sendResponseHeaders(200, bytes.length);
        OutputStream outputStream = httpExchange.getResponseBody();
        outputStream.write(bytes);
        outputStream.flush();
        outputStream.close();
    }
}
