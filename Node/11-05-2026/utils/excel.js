const ExcelJS =
  require("exceljs");

exports.generateUsersExcel =
  async(users) => {

    const workbook =
      new ExcelJS.Workbook();

    const worksheet =
      workbook.addWorksheet("Users");

    worksheet.columns = [

      {
        header: "Name",
        key: "name",
        width: 20
      },

      {
        header: "Email",
        key: "email",
        width: 30
      }

    ];

    users.forEach(user => {

      worksheet.addRow({

        name: user.name,

        email: user.email

      });

    });

    const filePath =
      "./exports/users.xlsx";

    await workbook.xlsx.writeFile(
      filePath
    );

    return filePath;

};