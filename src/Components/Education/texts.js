import sendMessage from "../../Functions/sendMessage";

const textPortuguese = [
    "Educação",
    "Engenharia Física",
    "Técnico em Mecatrônica",
    "2017 - Atualmente",
    "2014 - 2016",
    "UFRGS",
    "IFSC",
    "O curso de Engenharia Física é uma graduação interdisciplinar que combina os princípios da Física com as aplicações práticas da Engenharia, formando profissionais capazes de desenvolver tecnologias inovadoras em áreas como nanotecnologia, energia renovável, óptica, ciência de dados e instrumentação científica. O currículo abrange desde disciplinas teóricas (mecânica quântica, eletromagnetismo, termodinâmica) até técnicas de engenharia (eletrônica, programação, robótica), com forte ênfase em pesquisa e desenvolvimento (P&D). O engenheiro físico atua na fronteira entre ciência e tecnologia, projetando soluções para indústrias de alta complexidade, laboratórios de pesquisa ou startups de base tecnológica, sendo essencial em setores como aeroespacial, medicina, telecomunicações e energia nuclear.",
    "O curso técnico em Mecatrônica é uma formação profissionalizante que integra conhecimentos de Mecânica, Eletrônica, Automação e Programação, preparando alunos para atuar na instalação, manutenção e operação de sistemas automatizados e robóticos utilizados em indústrias. O currículo combina disciplinas práticas como pneumática, hidráulica, CLPs (Controladores Lógicos Programáveis), sensores, robótica e CNC com noções de eletricidade, desenho técnico e microcontroladores (como Arduino). O técnico em Mecatrônica é capacitado para trabalhar em linhas de produção, manutenção de máquinas inteligentes e desenvolvimento de projetos de automação, sendo essencial em setores como manufatura avançada, automotivo, energia e indústria 4.0.",
    "Saiba mais"
]


const textEnglish = [
    "Education",
    "Physics Engineering",
    "Mechatronics Technician",
    "2017 - Now",
    "2014 - 2016",
    "UFRGS",
    "IFSC",
    "The Physics Engineering course is an interdisciplinary graduation that combines the principles of Physics with the practical applications of Engineering, forming professionals capable of developing innovative technologies in areas such as nanotechnology, renewable energy, optics, data science and scientific instrumentation. The curriculum covers from theoretical disciplines (quantum mechanics, electromagnetism, thermodynamics) to engineering techniques (electronics, programming, robotics), with a strong emphasis on research and development (R&D). The physical engineer operates at the frontier between science and technology, designing solutions for high complexity industries, research laboratories or technology-based startups, being essential in sectors such as aerospace, medicine, telecommunications and nuclear energy.",
    "The Mechatronics Technician course is a professionalizing training that integrates knowledge of Mechanics, Electronics, Automation and Programming, preparing students to work in the installation, maintenance and operation of automated and robotic systems used in industries. The curriculum combines practical disciplines such as pneumatics, hydraulics, PLCs (Programmable Logic Controllers), sensors, robotics and CNC with notions of electricity, technical drawing and microcontrollers (such as Arduino). The Mechatronics Technician is qualified to work on production lines, maintenance of intelligent machines and development of automation projects, being essential in sectors such as advanced manufacturing, automotive, energy and industry 4.0.",
    "Learn more"
]

function textSelector(language, textPosition) {
    return sendMessage(language, textPosition, { textEnglish, textPortuguese });
}

export default textSelector;
