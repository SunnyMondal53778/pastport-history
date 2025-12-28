# 🏛️ PastPort: The AI Heritage Guide

![PastPort Banner](https://via.placeholder.com/1200x400?text=PastPort+AI+Heritage+Guide)
> **Track:** Heritage Tech | **Event:** [Name of Hackathon]  
> **Built by:** [Your Name / Team Name]

## 💡 The Inspiration
India is home to thousands of historical sites, but many lack proper guides or information boards. Tourists often gaze at ruins without understanding the stories behind them. **PastPort** solves this by turning your smartphone into an intelligent, personal historian.

## 🚀 What it Does
PastPort is a Progressive Web App (PWA) that uses Generative AI to bridge the gap between the past and the present.

* **📸 Snap & Identify:** Upload a photo of any monument, statue, or artifact.
* **🧠 Contextual History:** It doesn't just name the monument; it tells you *why* it was built, the architectural style, and hidden legends.
* **🗣️ Audio Guide:** Converts the history into speech, acting as a personal tour guide.
* **🌏 Multi-Language Support:** instantly translates the history into local languages (Hindi, Bengali, Spanish, etc.) for accessibility.
* **⚠️ Restoration Vision:** (Beta) AI suggests what ruined structures might have looked like in their prime.

## 🛠️ Tech Stack
This project was built with a focus on speed, performance, and modern AI integration.

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Components:** [ShadCN UI](https://ui.shadcn.com/) (Radix Primitives)
* **AI Model:** [Google Gemini 1.5 Pro](https://deepmind.google/technologies/gemini/) (via Vercel AI SDK)
* **Deployment:** [Vercel](https://vercel.com/)

## ⚙️ Architecture
1.  **Input:** User uploads an image via the Next.js frontend.
2.  **Processing:** The image is converted to base64 and sent to the API route.
3.  **Intelligence:** The `Gemini Vision` model analyzes the image features against historical data.
4.  **Output:** A structured JSON response containing the Name, History, Danger Level, and Fun Facts is returned and rendered on the UI.

## ⚡ Getting Started Locally

Cloning the repository:
```bash
git clone [https://github.com/yourusername/pastport.git](https://github.com/yourusername/pastport.git)
cd pastport
