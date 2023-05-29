# Aconselhamento de Matrícula - Projeto da Disciplina de Programação Orientada a Objetos

<hr>

O sistema de aconselhamento de matrícula tem por objetivo, dado o histórico do aluno, aconselhá-lo de quais disciplinas ele deverá se matricular, desde o período atual, para que termine o curso no menor tempo possível (caso seja possível), com no máximo 8 (oito) disciplinas por período e sem choques de horário, usando técnicas de computação evolucionária.

> ## Tecnologias Utilizadas

- IDE INTELIJ
- JAVA
- HTML
- CSS
- JavaScript
- React
- React Bootstrap
- Tailwind
- Git e Github

> ## Alunos

- João Victor | jvcl@ic.ufal.br
- José Fabiano | jsfa@ic.ufal.br
- Luiz Fernando | lfsl@ic.ufal.br
- Karolaine Lima | kls@ic.ufal.br

> ## Professor

- Baldoino Fonseca | baldoino@ic.ufal.br
<br/>
<br/>

> ## Instruções

- O projeto foi feito utilizando a IDE inteliJ, com a versão 20 do JDK. Primeiro compile o back (ajuste a porta no arquivo server), em seguida compile o front utilizando o comando npm run dev(usar o comando "npm install" para baixar as dependências antes de compilar).

> ## Resumo
- Refatoramos o código para conseguirmos aplicar os seguintes padrões: Command pattern e States. Também consegui aplicar o polimorfismo(no método "executeoperation", localizado na pasta "command"), que antes não havia, mas foi necessário para usar o padrão Command. Exceptions também foi aplicado em várias partes do código, exemplo: na criação de lista de usuário(usando try e catch). Para melhor eficácia, usamos o padrão DAO, para deixar as classes mais legíveis e também porque pretendíamos aplicar um banco de dados, o que não foi possível devido ao tempo.

<br/>

> ## Command Pattern
- O command vai em User, chama o comando, então o comando passa pela interface de comando. O padrão é ter uma interface de comando e um método "execute", que executa de acordo com a classe concreta. Sendo cada classe concreta um comando.

> ## States
- O state foi usado para salvar o estado do usuário quando ele loga, iniciando como "não logado" e mudando quando o usuário faz login para "logado".
