const fs = require('fs');
const { marked } = require('marked');
const HTMLToDocx = require('html-to-docx');

async function generate() {
    try {
        const markdown = fs.readFileSync('week1.md', 'utf8');
        const htmlString = marked.parse(markdown);
        
        // Add basic styling to make tables look good in Word
        const styledHtml = `
          <!DOCTYPE html>
          <html>
          <head>
              <style>
                  table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
                  th, td { border: 1px solid black; padding: 8px; text-align: left; }
                  th { background-color: #f2f2f2; }
                  h1, h2, h3 { color: #333; }
              </style>
          </head>
          <body>
              ${htmlString}
          </body>
          </html>
        `;

        const fileBuffer = await HTMLToDocx(styledHtml, null, {
          table: { row: { cantSplit: true } },
          footer: true,
          pageNumber: true,
        });

        fs.writeFileSync('Bao_Cao_Tuan_01.docx', fileBuffer);
        console.log('✅ Chuyển đổi thành công! Đã tạo file Bao_Cao_Tuan_01.docx');
    } catch (err) {
        console.error('Lỗi khi tạo file Word:', err);
    }
}

generate();
