# FIAP Campus Helper
Aplicação mobile desenvolvida para otimizar a experiência de alunos e funcionários do campus FIAP. Resolve problemas comuns como agendamento de laboratórios, gestão de achados e perdidos, e consulta de disponibilidade de salas.

## Resumo do Projeto
| Aspecto | Descrição |
| --- | --- |
| Problema Resolvido | Dificuldade de agendamento de laboratórios, desorganização de itens perdidos e falta de informação sobre salas disponíveis |
| Solução Implementada | Três módulos principais: Agendamento de Laboratórios, Achados e Perdidos, Consulta de Salas Livres |
| Público-Alvo | Alunos e funcionários FIAP |
| Operações Suportadas | Gestão de recursos e serviços de apoio do campus |

## Equipe de Desenvolvimento
| Nome | RM | Responsabilidades |
| --- | --- | --- |
| João Victor Alves de Abreu | 564946 | Desenvolvimento completo, arquitetura e documentação |

## Instruções de Execução
### Pré-requisitos
- Node.js v18 ou superior
- Expo CLI: `npm install -g @expo/cli`
- Android Studio com emulador configurado OU aplicativo Expo Go instalado
- Mesma rede Wi-Fi para desenvolvimento local

### Instalação e Execução
```bash
# Windows: Permitir execução de scripts (executar como Administrador)
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted

# Criar projeto com template blank (JavaScript)
npx create-expo-app@latest fiap-campus-helper --template blank
cd fiap-campus-helper
# Instalar dependências do Expo Router
depx expo install expo-router react-native-safe-area-context react-native-screens react-native-safe-area-context
# Iniciar servidor de desenvolvimento
npx expo start
```
### Opções de execução:
- `a` - Abrir em emulador Android Studio
- `i` - Abrir em emulador iOS (macOS)
- Escanear QR Code com Expo Go

## Solução de Problemas Comuns
| Problema | Solução |
| --- | --- |
| QR Code não funciona | `npx expo start --tunnel` |
| App trava ou não carrega | `npx expo start --clear` |
| Rede diferente | Usar modo tunnel ou hotspot |
| Expo Go desatualizado | Atualizar na App Store/Play Store |

## Demonstração
### Capturas de Tela
tela visualização:
- Login 
- Home 
- Agendamento Labs 
- Achados e Perdidos 
- Salas Livres 
### Demonstração em Vídeo
defina o [link da demonstração completa]

## Arquitetura do Projeto
diretório:
fia-p-campus-helper/
javascript code block with tree structure...
txt
descrição das pastas e arquivos.
decisões técnicas.
stacks tecnológicos.
hooks implementados.
navegação.
design system.
fucionalidades detalhadas.