
# 🤖 Offline AI Agent Builder

<h3 align="center">Visually craft, configure, and export sophisticated AI agent definitions—no internet or API keys required.</h3>

<div align="center">
    
  <!-- Dynamic Badges -->
  <a href="https://github.com/sapthesh/ai-agent-builder/stargazers">
    <img src="https://img.shields.io/github/stars/sapthesh/ai-agent-builder?style=for-the-badge&logo=github&color=b491ff&logoColor=white" alt="Stars">
  </a>
  <a href="https://github.com/sapthesh/ai-agent-builder/network/members">
    <img src="https://img.shields.io/github/forks/sapthesh/ai-agent-builder?style=for-the-badge&logo=github&color=89c4f4&logoColor=white" alt="Forks">
  </a>
  <img src="https://img.shields.io/github/repo-size/sapthesh/ai-agent-builder?style=for-the-badge&logo=github&color=ff69b4&logoColor=white" alt="Repo Size">
  <img src="https://img.shields.io/github/last-commit/sapthesh/ai-agent-builder?style=for-the-badge&logo=github&color=f4d03f&logoColor=white" alt="Last Commit">
  <a href="https://hits.sh/github.com/sapthesh/ai-agent-builder/"><img alt="Hits" src="https://hits.sh/github.com/sapthesh/ai-agent-builder.svg?style=for-the-badge"/></a>
  <a href="https://hits.sh/github.com/sapthesh/ai-agent-builder/"><img alt="Hits" src="https://hits.sh/github.com/sapthesh/ai-agent-builder.svg?view=today-total&style=for-the-badge&color=fe7d37"/></a>
</div>

<div align="center">

<img alt="Static Badge" src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge">
<img alt="Static Badge" src="https://img.shields.io/badge/status-active-brightgreen?style=for-the-badge">
<img alt="Static Badge" src="https://img.shields.io/badge/mode-offline-blueviolet?style=for-the-badge">
<img alt="Static Badge" src="https://img.shields.io/badge/API_keys-not_required-orange?style=for-the-badge">

</div>

---

The **Offline AI Agent Builder** is a powerful, browser-based graphical user interface for designing AI agents. It provides an intuitive environment to define an agent's persona, system instructions, and, most importantly, the custom tools it can use. The entire configuration is validated in real-time and can be instantly exported as a clean, ready-to-use JSON file for your local models, private backends, or any other AI framework.

It's built for developers, researchers, and hobbyists who need a fast, secure, and flexible way to prototype and build AI agent configurations without being tied to a specific online service.

## ✨ Key Features

*   **🎨 Intuitive GUI**: A clean, Material Design 3 interface for a seamless building experience.
*   **🔌 Offline First**: Runs entirely in your browser. No data ever leaves your machine. Your privacy is paramount.
*   **🔑 No API Keys Needed**: Start building immediately without any sign-up or configuration.
*   **🤖 Model-Agnostic**: Define agents for any model, whether it's running locally on your machine (like Llama 3 or Mistral) or a private, custom API endpoint.
*   **🛠️ Powerful Tool Editor**:
    *   Easily add, remove, and configure tools.
    *   Define complex parameter schemas with support for `string`, `number`, `boolean`, `object`, and `array` types.
    *   Create **deeply nested parameters** for objects and arrays.
    *   Set **default values** and mark parameters as required.
    *   Manage tool versions with a dedicated `version` field.
*   **🚀 Agent Generator**: Kickstart your project by choosing from a rich library of pre-built agent personas, from a "JS Expert Debugger" to a "Luxury Travel Concierge".
*   **👀 Real-time JSON Preview**: Instantly see the generated JSON configuration as you build, with a one-click "Copy to Clipboard" button.
*   **✅ Live Validation**: The UI provides instant feedback, highlighting missing fields or name collisions to ensure your final configuration is valid.
*   **🌗 Light & Dark Modes**: A beautifully crafted theme toggle for your comfort.
*   **📁 One-Click Export**: Download your complete agent configuration as a perfectly formatted `.json` file.

## 💡 Why Use the Agent Builder?

1.  **Privacy & Security**: Since it's a fully client-side application, your agent definitions, system instructions, and tool schemas are never sent over the network. This is ideal for proprietary or sensitive configurations.

2.  **Ultimate Flexibility**: By decoupling the agent *design* from a specific model provider, you gain the freedom to switch between models (local, cloud, open-source, private) without redesigning your agent's core logic.

3.  **Rapid Prototyping**: Stop hand-writing and debugging complex JSON schemas. The visual editor allows you to iterate on your agent's capabilities in seconds, not hours. See your changes reflected instantly and catch errors before you ever run your agent.

4.  **Clarity and Organization**: A visual representation of your agent's tools and parameters makes it easier to understand, maintain, and share your designs with your team.

## 🚀 How to Use

Building an agent is a straightforward process:

1.  **Define Agent Identity**:
    *   Give your agent a `Name` and `Description`.
    *   Write a powerful `System Instruction` that defines its persona, goals, and constraints. This is the agent's "constitution."

2.  **Specify a Model**:
    *   In the `Model Configuration` card, enter the identifier for the model you intend to use (e.g., `llama3-7b-instruct`, `my-custom-model-v2`).

3.  **Create Tools**:
    *   Click `+ Add Tool` to create a new function your agent can call.
    *   Give the tool a clear, descriptive `Tool Name` and `Description`. The model will use this information to decide when to use the tool.
    *   Optionally, add a `Version` number.

4.  **Add Parameters**:
    *   For each tool, click `+ Add Parameter`.
    *   Define the `name`, `type`, `description`, and whether it's `required`.
    *   For `object` and `array` types, you can define nested parameters to build complex data structures.
    *   Use the "Default Value" input to provide a default, which will be reflected in the exported JSON.

5.  **Export**:
    *   As you build, the `Export Configuration` panel on the right updates in real-time.
    *   When you're ready, click `Copy` to grab the JSON or `Export` to download it as a file.

> **⚡ Pro Tip:** Don't want to start from scratch? Click the **Agent Generator** button in the header to load a complete, pre-built agent from our library. You can then customize it to fit your exact needs!

## 🛠️ Tech Stack

*   **React**: For building the reactive user interface.
*   **TypeScript**: For robust, type-safe code.
*   **Tailwind CSS**: For a modern, utility-first styling workflow, configured with a Material Design 3 color palette.

## 🏁 Getting Started (Development)

This project is designed to be as simple as possible to run.

1.  Clone this repository.
2.  Open the `index.html` file directly in your web browser.

That's it! There are no build steps or dependencies to install.

## ❤️ Contributing

Contributions are welcome! If you have ideas for new features, pre-built agents for the library, or UI improvements, please open an issue or submit a pull request.

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
