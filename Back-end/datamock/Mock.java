package datamock;

import model.Course;
import model.Subject;
import model.Time;
import model.User;

public class Mock {
    public static void start() {

        System.out.println("INICIANDO DADOS MOCKADOS");

        Subject programacao1 = new Subject(1,"Programação 1", "COMP359", 1,72,false);
        programacao1.getTimes().add(new Time("Segunda",1));
        programacao1.getTimes().add(new Time("Quarta",1));

        Subject logicaParaComputacao = new Subject(2,"Lógica Para Computacao 1", "COMP360", 2,72,false);
        logicaParaComputacao.getTimes().add(new Time("Segunda",2));
        logicaParaComputacao.getTimes().add(new Time("Quarta",5));

        Subject estruturaDeDados = new Subject(3,"Estrutura de Dados", "COMP364", 2,72,false);
        estruturaDeDados.getRequirements().add(programacao1);
        estruturaDeDados.getTimes().add(new Time("Segunda",4));
        estruturaDeDados.getTimes().add(new Time("Terça",4));

        SubjectMock.getSubjectsMock().add(programacao1);
        SubjectMock.getSubjectsMock().add(logicaParaComputacao);
        SubjectMock.getSubjectsMock().add(estruturaDeDados);

        Course cursoCienciaComputacao = new Course(1, "Ciência da Computação", 936, 2391, 12);
        cursoCienciaComputacao.getSubjects().add(programacao1);
        cursoCienciaComputacao.getSubjects().add(logicaParaComputacao);
        cursoCienciaComputacao.getSubjects().add(estruturaDeDados);

        CourseMock.getCourseMock().add(cursoCienciaComputacao);

        UserMock.getUsersMock().add(0,new User(1, "Jose","admin","jose","123456"));
        UserMock.getUsersMock().add(1,new User(2, "Antonio","admin","antonio","123456"));
        UserMock.getUsersMock().add(1,new User(3, "Karolaine","admin","karol","123456"));

        System.out.println("FINALIZANDO DADOS MOCKADOS");
    }
}
