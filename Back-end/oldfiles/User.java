package oldfiles;

import java.util.ArrayList;
import org.json.JSONArray;
import org.json.JSONObject;

public class User {
	static int userCount = 0;

	public static User auth = null;
	public static boolean logged = false;

	static ArrayList<User> users = new ArrayList<User>();

	public int currentSemester;
	public String course;

	// --- ARRAYLIST DAS DISCIPLINAS PAGAS PELO ALUNO ---
	public ArrayList<Subject> discipline_list = new ArrayList<Subject>();

	private int id;
	public String name;
	public String role;
	public String username;
	public String password;
	
	protected User(String name, String role, String username, String password) {
		this.id = ++userCount;;
		this.name = name;
		this.role = role;
		this.username = username;
		this.password = password; 
	}

	public JSONObject getJsonString() {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("id", this.id);
		jsonObject.put("name", this.name);
		jsonObject.put("role", this.role);
		jsonObject.put("username", this.username);
		return jsonObject;
	}

	static public String getAllUsersJson() {
		JSONArray jsonArray = new JSONArray();
		for (User user : users) {
				jsonArray.put(user.getJsonString());
		}
		return jsonArray.toString();
	}

	static public User get(Integer id) {
		return users.stream().filter(user -> user.id == id).findFirst().get();
	}
	
	static public void create(String name, String role, String username, String password) {
		try{
            if(name.isEmpty() || role.isEmpty() || username.isEmpty() || password.isEmpty()){
                // Lançar uma exceção customizada ou uma exceção existente
                throw new IllegalArgumentException("Campos obrigatórios não foram preenchidos.");
            }
			if(role == "admin") {
				users.add(new UserAdmin(name, username, password));
			} else {
				users.add(new UserStudent(name, username, password));
			}
        }catch(IllegalArgumentException e){
            System.out.print("Erro:" + e);
        }
	}

	public void edit(String name, String username, String password) {
		try{
			if(name.isEmpty() || role.isEmpty() || username.isEmpty() || password.isEmpty()){
				// Lançar uma exceção customizada ou uma exceção existente
                throw new IllegalArgumentException("Campos obrigatórios não foram preenchidos.");
            }
			this.name = name;
			this.username = username;
			this.password = password;
        }catch(IllegalArgumentException e){
            System.out.print("Erro:" + e);
        }
	}
	
	public void delete() {
		users.remove(this);
	}
	// --- CHECAR AUTENTICAÇÃO ---
	static public boolean auth_check(String username, String password) {
		for(int i = 0 ; i < users.size(); i++){
			if(users.get(i).username.equals(username) && users.get(i).password.equals(password)){
				User.auth = users.get(i);
				User.logged = true;
				return true;
			}
		}
		return false;
	}

	// -- RECUPERAR SENHA ---
	static public void recuperarSenha(String username){
        for(int i = 0 ; i < users.size(); i++){
            if(users.get(i).username.equals(username)){
                String password = (users.stream().filter(user -> user.username.equals(username)).findFirst().get()).password;
                System.out.print("senha : ");
                System.out.println(password);
                return;
            }
        }
        System.out.print(" Usuário não encontrado!\n");
    }

	// Overridden
	public void historic_read(){}
}
