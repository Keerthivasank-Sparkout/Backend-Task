const PDFDocument =
  require("pdfkit");

const fs = require("fs");

exports.generateUsersPDF =
  async(users) => {

    return new Promise((resolve, reject) => {

      const doc =
        new PDFDocument();

      const filePath =
        "./exports/users.pdf";

      const stream =
        fs.createWriteStream(filePath);

      doc.pipe(stream);

      doc.fontSize(20)
         .text("Users Report");

      doc.moveDown();

      users.forEach((user, index) => {

        doc.fontSize(12).text(

          `${index + 1}.
           ${user.name}
           - ${user.email}`

        );

      });

      doc.end();

      stream.on("finish", () => {

        resolve(filePath);

      });

      stream.on("error", reject);

    });

};