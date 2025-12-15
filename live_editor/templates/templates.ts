import { TFunction } from "../hooks/useTranslations";

export interface Template {
    name: string;
    description: string;
    icon: string;
    width: number;
    height: number;
    html: string;
    css?: string;
}

export const createTemplateHtml = (width: number, height: number, content: string) => `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>새 문서</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <style>
        /* Mimics the structure and essential styles from initialHtml.ts */
        html, body {
            overflow: hidden; /* Prevent scrollbars from resizer handles overflowing the body */
        }
        body {
            margin: 0;
            background-color: #e5e7eb; /* Match the editor's preview pane background */
        }
        .slide-container {
            /* This is a wrapper for one or more slides. */
            display: flex;
            flex-direction: column;
            align-items: center; /* Center slides */
            padding: 32px 0; /* Padding for single slide view */
            margin: 0 auto;
        }
        .slide-item {
            /* This is the actual slide content area */
            width: ${width}px;
            height: ${height}px;
            background-color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            overflow: hidden; /* Important for the slide itself */
        }
        /* Basic reset for content inside */
        .slide-item > * { margin: 0; }
    </style>
</head>
<body>
    <div class="slide-container">
        <div class="slide-item">
            ${content}
        </div>
    </div>
</body>
</html>
`.trim();

export const getTemplates = (t: TFunction): Template[] => ([
    {
        name: t('templates.blankCanvas.name'),
        description: t('templates.blankCanvas.description'),
        icon: 'fas fa-file',
        width: 1280,
        height: 720,
        html: createTemplateHtml(1280, 720, t('templates.blankCanvas.content') as string),
    },
    {
        name: t('templates.presentation.name'),
        description: t('templates.presentation.description'),
        icon: 'fas fa-desktop',
        width: 1280,
        height: 720,
        html: createTemplateHtml(1280, 720, t('templates.presentation.content') as string),
    },
    {
        name: t('templates.a4.name'),
        description: t('templates.a4.description'),
        icon: 'fas fa-file-alt',
        width: 794,
        height: 1123,
        html: createTemplateHtml(794, 1123, t('templates.a4.content') as string),
    },
    {
        name: t('templates.mobile.name'),
        description: t('templates.mobile.description'),
        icon: 'fas fa-mobile-alt',
        width: 375,
        height: 667,
        html: createTemplateHtml(375, 667, t('templates.mobile.content') as string),
    },
    {
        name: t('templates.social.name'),
        description: t('templates.social.description'),
        icon: 'fab fa-instagram',
        width: 1080,
        height: 1080,
        html: createTemplateHtml(1080, 1080, t('templates.social.content') as string),
    },
    {
        name: t('templates.banner.name'),
        description: t('templates.banner.description'),
        icon: 'fas fa-ad',
        width: 728,
        height: 90,
        html: createTemplateHtml(728, 90, t('templates.banner.content') as string),
    },
]);