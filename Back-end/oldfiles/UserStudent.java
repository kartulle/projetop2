package oldfiles;

import org.json.JSONArray;
import org.json.JSONObject;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.IOException;

public class UserStudent extends User {
  public UserStudent(String name, String username, String password) {
    super(username, "aluno", username, password);
  }

  @Override
  public void historic_read() {
		try {
			String jsonStr = new String(Files.readAllBytes(Paths.get("oldfiles/historico_analitico.json")));
			JSONObject jsonObj = new JSONObject(jsonStr);
									
			Integer currentSemester = jsonObj.getInt("currentSemester");
			JSONArray subjectsArr = jsonObj.getJSONArray("subjects");
			String course = jsonObj.getString("course");
				
			for (int i = 0; i < subjectsArr.length(); i++) {
				JSONObject subjectObj = subjectsArr.getJSONObject(i);

				Subject aux = new Subject(
					subjectObj.getString("name"),
					subjectObj.getString("code")
				);
				auth.discipline_list.add(aux);
			}
			User.auth.currentSemester = currentSemester;
			User.auth.course = course;
		} catch (IOException e) {
            System.out.println("Erro durante a submissão do arquivo: " + e.getMessage() + "\n");
        } 
	}
}
