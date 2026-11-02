# Light Cells Solutions

The official website for Light Cells Solutions, presenting the company's biotechnology, information technology, and maintenance services.

## Overview

The site brings the company's services and products together in one place. Visitors can explore biotechnology products, learn about IT and maintenance services, and contact the team with enquiries.

## Features

- Company home and about pages
- Biotechnology products and services
- Searchable product catalogue with category filters
- Information technology and maintenance pages
- Contact and product enquiry forms
- Responsive layouts

## Tech Stack

- React
- Vite
- React Router
- CSS

## Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/) and npm.

### Installation

Clone the repository and install its dependencies:

```bash
git clone https://github.com/mozammilh9911/LightCellsSolution.git
cd LightCellsSolution
npm install
```

### Run the Development Server

```bash
npm run dev
```

Vite will print the local URL in the terminal.

### Build for Production

```bash
npm run build
```

### Run Lint Checks

```bash
npm run lint
```

## Inquiry Emails

Product inquiry forms and the contact page email submitted details through [FormSubmit](https://formsubmit.co/) to `sajda3109@gmail.com` by default. FormSubmit processes the submitted details to deliver the email. On the first submission, FormSubmit sends a confirmation email to the recipient; confirm it before testing delivery.

To use a different recipient, create a `.env.local` file in the project root:

```env
VITE_PRODUCT_INQUIRY_EMAIL=your-email@example.com
```

Restart the development server after changing the recipient. For a production deployment, set the same variable in the hosting provider's environment settings and rebuild the site. The recipient address is included in the public frontend; do not put passwords or API secrets in `VITE_` variables.

## Main Pages

| Page | URL |
|---|---|
| Home | `/` |
| About | `/about` |
| Information Technology | `/Information` |
| Biotechnology | `/biotechnology` |
| Biotechnology About | `/biotechnology/about` |
| Biotechnology Products | `/biotechnology/products` |
| Maintenance | `/maintenance` |
| Contact | `/contact` |
