# Next.js OCR Frontend

This repository contains the frontend application for an OCR (Optical Character Recognition) project built with Next.js 14. It is part of a full-stack project, with the backend available [here](https://github.com/meligavincent/fastapi_tesseract).

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview

This project leverages Next.js for building a performant and scalable frontend application for an OCR system. The application allows users to upload images, which are then processed by the backend to extract text.

## Features

- Image upload and preview
- Integration with a FastAPI backend for OCR processing
- Responsive design
- Real-time feedback on OCR processing status

## Getting Started

### Prerequisites

Make sure you have the following installed on your development machine:

- Node.js (v14 or higher)
- npm or yarn
- [Backend OCR API](https://github.com/meligavincent/fastapi_tesseract) running locally or deployed

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/meligavincent/nextjs_ocr.git
    cd nextjs_ocr
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

To start the development server, run:

```bash
npm run dev
# or
yarn dev
