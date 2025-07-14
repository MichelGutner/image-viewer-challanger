# ImageViewerApp 📱

Um aplicativo React Native para visualização de imagens com funcionalidades de galeria remota e offline, download de imagens e navegação intuitiva.

## 🚀 Funcionalidades

- **Galeria Remota**: Visualize imagens da API Picsum Photos
- **Galeria Offline**: Acesse imagens baixadas sem conexão
- **Download de Imagens**: Baixe imagens para visualização offline
- **Navegação Intuitiva**: Interface limpa e fácil de usar
- **Background Download**: Downloads em segundo plano
- **Persistência Local**: Armazenamento local com Realm

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [Xcode](https://developer.apple.com/xcode/) (para iOS)
- [Android Studio](https://developer.android.com/studio) (para Android)
- [CocoaPods](https://cocoapods.org/) (para iOS)

## 🛠️ Instalação

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Instale as dependências do iOS** (apenas para desenvolvimento iOS)
   ```bash
   cd ios
   pod install
   cd ..
   ```

## 🏃‍♂️ Executando o Aplicativo

### Desenvolvimento

1. **Inicie o Metro bundler**
   ```bash
   npm start
   # ou
   yarn start
   ```

2. **Execute no iOS Simulator**
   ```bash
   npm run ios
   # ou
   yarn ios
   ```

3. **Execute no Android Emulator**
   ```bash
   npm run android
   # ou
   yarn android
   ```

### Build de Produção

#### iOS
```bash
cd ios
xcodebuild -workspace ImageViewerApp.xcworkspace -scheme ImageViewerApp -configuration Release -destination generic/platform=iOS -archivePath ImageViewerApp.xcarchive archive
```

#### Android
```bash
cd android
./gradlew assembleRelease
```

## 🧪 Executando Testes

```bash
# Executar todos os testes
npm test
# ou
yarn test

# Executar testes com coverage
npm run test:coverage
# ou
yarn test:coverage

# Executar testes em modo watch
npm run test:watch
# ou
yarn test:watch
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── atoms/          # Componentes básicos (Button, Text, Loading)
│   ├── molecules/      # Componentes compostos (TopButtons, BackDropImage)
│   └── templates/      # Templates de layout (Header, Footer)
├── screens/            # Telas do aplicativo
│   ├── home/           # Tela principal
│   ├── gallery/        # Galeria remota
│   ├── offlineGallery/ # Galeria offline
│   └── details/        # Detalhes da imagem
├── services/           # Serviços de API e dados
├── hooks/              # Custom hooks
├── storage/            # Configuração de armazenamento (Realm)
├── store/              # Gerenciamento de estado (Redux)
├── types/              # Definições de tipos TypeScript
├── constants/          # Constantes do aplicativo
└── utils/              # Utilitários e helpers
```

## 🔧 Configuração

### Configuração do Realm

O aplicativo usa Realm para persistência local. A configuração está em `src/storage/realm/index.ts`.

#### Realm Studio

Para visualizar e gerenciar o banco de dados Realm, você pode usar o **Realm Studio**:

1. **Download do Realm Studio**
   - Acesse o [site oficial do Realm Studio](https://realm.io/products/realm-studio/)
   - Baixe a versão para seu sistema operacional (macOS, Windows, Linux)

2. **Path do Banco de Dados**
   - O aplicativo exibe o path padrão do Realm no console quando inicia
   - Procure por: `Realm path: [caminho-do-banco]` nos logs do Metro bundler
   - Exemplo de path: `/Users/[usuario]/Library/Developer/CoreSimulator/Devices/[device-id]/data/Containers/Data/Application/[app-id]/Documents/default.realm`

3. **Abrindo no Realm Studio**
   - Abra o Realm Studio
   - Clique em "Open Realm file"
   - Navegue até o path exibido no console
   - Selecione o arquivo `default.realm`
   - Agora você pode visualizar e gerenciar os dados do banco

**Nota**: O path pode variar dependendo da plataforma (iOS Simulator, Android Emulator, dispositivo físico).

## 📱 Funcionalidades Principais

### Galeria Remota
- Carregamento infinito de imagens
- Busca de imagens aleatórias
- Informações detalhadas das imagens

### Galeria Offline
- Visualização de imagens baixadas
- Gerenciamento de downloads
- Exclusão de imagens

### Download de Imagens
- Download em background
- Progresso do download
- Tratamento de erros

## 🐛 Solução de Problemas

### Problemas Comuns

1. **Erro de Metro bundler**
   ```bash
   npx react-native start --reset-cache
   ```

2. **Erro de pods no iOS**
   ```bash
   cd ios
   pod deintegrate
   pod install
   ```

3. **Erro de build no Android**
   ```bash
   cd android
   ./gradlew clean
   ```

4. **Erro de dependências**
   ```bash
   rm -rf node_modules
   npm install
   ```

**Desenvolvido com ❤️ usando React Native**