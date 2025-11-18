import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportToPNG(elementId: string, filename: string, userName?: string) {
  const element = document.getElementById('resume-template-export');
  if (!element) {
    throw new Error('Element not found');
  }

  // A4 dimensions at 96 DPI: 794px × 1123px (scaled 2x for quality)
  const a4Width = 794;
  const a4Height = 1123;
  
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    width: a4Width,
    height: a4Height,
    windowWidth: a4Width,
  });

  const finalFilename = userName 
    ? `${userName.replace(/\s+/g, '_')}_Resume`
    : filename;

  const triggerDownload = (url: string) => {
    const link = document.createElement('a');
    link.download = `${finalFilename}.png`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (url.startsWith('blob:')) {
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  };

  canvas.toBlob((blob) => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      triggerDownload(url);
    } else {
      triggerDownload(canvas.toDataURL('image/png'));
    }
  });
}

export async function exportToPDF(elementId: string, filename: string, userName?: string) {
  const element = document.getElementById('resume-template-export');
  if (!element) {
    throw new Error('Element not found');
  }

  // A4 dimensions at 96 DPI: 794px × 1123px (scaled 2x for quality)
  const a4Width = 794;
  const a4Height = 1123;

  // Capture the element as canvas with proper A4 dimensions
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    width: a4Width,
    height: a4Height,
    windowWidth: a4Width,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const imgWidth = 210; // A4 width in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
  // Handle multi-page if content is too long
  const pageHeight = 297; // A4 height in mm
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }
  
  const finalFilename = userName 
    ? `${userName.replace(/\s+/g, '_')}_Resume`
    : filename;
  
  pdf.save(`${finalFilename}.pdf`);
}

export async function exportToDocx(resumeData: any, filename: string, userName?: string) {
  const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } = await import('docx');
  
  const sections = [];
  
  // Header section with name and contact info
  sections.push(
    new Paragraph({
      text: resumeData.personalInfo?.name || 'Your Name',
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    })
  );
  
  // Contact information
  const contactInfo = [];
  if (resumeData.personalInfo?.email) contactInfo.push(resumeData.personalInfo.email);
  if (resumeData.personalInfo?.phone) contactInfo.push(resumeData.personalInfo.phone);
  if (resumeData.personalInfo?.location) contactInfo.push(resumeData.personalInfo.location);
  
  if (contactInfo.length > 0) {
    sections.push(
      new Paragraph({
        text: contactInfo.join(' | '),
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
      })
    );
  }
  
  // Objective/Summary
  if (resumeData.objective) {
    sections.push(
      new Paragraph({
        text: 'OBJECTIVE',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      }),
      new Paragraph({
        text: resumeData.objective,
        spacing: { after: 300 },
      })
    );
  }
  
  // Education
  if (resumeData.education && resumeData.education.length > 0) {
    sections.push(
      new Paragraph({
        text: 'EDUCATION',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      })
    );
    
    resumeData.education.forEach((edu: any) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: edu.degree || '', bold: true }),
            new TextRun({ text: edu.institution ? ` - ${edu.institution}` : '', bold: true }),
          ],
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: `${edu.startDate || ''} - ${edu.endDate || 'Present'}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}`,
          spacing: { after: 200 },
        })
      );
    });
  }
  
  // Experience
  if (resumeData.experience && resumeData.experience.length > 0) {
    sections.push(
      new Paragraph({
        text: 'EXPERIENCE',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      })
    );
    
    resumeData.experience.forEach((exp: any) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: exp.title || '', bold: true }),
            new TextRun({ text: exp.company ? ` - ${exp.company}` : '', bold: true }),
          ],
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: `${exp.startDate || ''} - ${exp.endDate || 'Present'}`,
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: exp.description || '',
          spacing: { after: 200 },
        })
      );
    });
  }
  
  // Skills
  const hasSkills = resumeData.skills?.languages?.length || resumeData.skills?.frameworks?.length || resumeData.skills?.tools?.length;
  if (hasSkills) {
    sections.push(
      new Paragraph({
        text: 'SKILLS',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      })
    );
    
    if (resumeData.skills.languages?.length) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Languages: ', bold: true }),
            new TextRun({ text: resumeData.skills.languages.join(', ') }),
          ],
          spacing: { after: 100 },
        })
      );
    }
    
    if (resumeData.skills.frameworks?.length) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Frameworks: ', bold: true }),
            new TextRun({ text: resumeData.skills.frameworks.join(', ') }),
          ],
          spacing: { after: 100 },
        })
      );
    }
    
    if (resumeData.skills.tools?.length) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Tools: ', bold: true }),
            new TextRun({ text: resumeData.skills.tools.join(', ') }),
          ],
          spacing: { after: 200 },
        })
      );
    }
  }
  
  // Projects
  if (resumeData.projects && resumeData.projects.length > 0) {
    sections.push(
      new Paragraph({
        text: 'PROJECTS',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      })
    );
    
    resumeData.projects.forEach((project: any) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: project.title || '', bold: true }),
          ],
          spacing: { after: 50 },
        }),
        new Paragraph({
          text: project.description || '',
          spacing: { after: 200 },
        })
      );
    });
  }
  
  // Create the document
  const doc = new Document({
    sections: [{
      properties: {},
      children: sections,
    }],
  });
  
  // Generate and download
  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  
  const finalFilename = userName 
    ? `${userName.replace(/\s+/g, '_')}_Resume`
    : filename;
  
  link.download = `${finalFilename}.docx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

