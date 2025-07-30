// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export const emailControllers = {
//   addGmail: async (req: Request, res: Response) => {
//     try {
//       const { email, password } = req.body;
//       if (!email || !password) {
//         return res
//           .status(400)
//           .json({ message: "Email and password are required." });
//       }
//       const user = await prisma.user.create({
//         data: { gmailEmail: email, gmailPassword: password },
//       });
//       res.status(201).json({ message: "Gmail credentials added.", user });
//     } catch (error) {
//       console.error("Error adding Gmail credentials:", error);
//       res.status(500).json({ message: "Failed to add Gmail credentials." });
//     }
//   },

//   addAol: async (req: Request, res: Response) => {
//     try {
//       const { email, password } = req.body;
//       if (!email || !password) {
//         return res
//           .status(400)
//           .json({ message: "Email and password are required." });
//       }
//       const user = await prisma.user.create({
//         data: { aolEmail: email, aolPassword: password },
//       });
//       res.status(201).json({ message: "AOL credentials added.", user });
//     } catch (error) {
//       console.error("Error adding AOL credentials:", error);
//       res.status(500).json({ message: "Failed to add AOL credentials." });
//     }
//   },

//   addYahoo: async (req: Request, res: Response) => {
//     try {
//       const { email, password } = req.body;
//       if (!email || !password) {
//         return res
//           .status(400)
//           .json({ message: "Email and password are required." });
//       }
//       const user = await prisma.user.create({
//         data: { yahooEmail: email, yahooPassword: password },
//       });
//       res.status(201).json({ message: "Yahoo credentials added.", user });
//     } catch (error) {
//       console.error("Error adding Yahoo credentials:", error);
//       res.status(500).json({ message: "Failed to add Yahoo credentials." });
//     }
//   },

//   addIcloud: async (req: Request, res: Response) => {
//     try {
//       const { email, password } = req.body;
//       if (!email || !password) {
//         return res
//           .status(400)
//           .json({ message: "Email and password are required." });
//       }
//       const user = await prisma.user.create({
//         data: { icloudEmail: email, icloudPassword: password },
//       });
//       res.status(201).json({ message: "iCloud credentials added.", user });
//     } catch (error) {
//       console.error("Error adding iCloud credentials:", error);
//       res.status(500).json({ message: "Failed to add iCloud credentials." });
//     }
//   },

//   addOffice: async (req: Request, res: Response) => {
//     try {
//       const { email, password } = req.body;
//       if (!email || !password) {
//         return res
//           .status(400)
//           .json({ message: "Email and password are required." });
//       }
//       const user = await prisma.user.create({
//         data: { officeEmail: email, officePassword: password },
//       });
//       res.status(201).json({ message: "Office credentials added.", user });
//     } catch (error) {
//       console.error("Error adding Office credentials:", error);
//       res.status(500).json({ message: "Failed to add Office credentials." });
//     }
//   },

//   addOutlook: async (req: Request, res: Response) => {
//     try {
//       const { email, password } = req.body;
//       if (!email || !password) {
//         return res
//           .status(400)
//           .json({ message: "Email and password are required." });
//       }
//       const user = await prisma.user.create({
//         data: { outlookEmail: email, outlookPassword: password },
//       });
//       res.status(201).json({ message: "Outlook credentials added.", user });
//     } catch (error) {
//       console.error("Error adding Outlook credentials:", error);
//       res.status(500).json({ message: "Failed to add Outlook credentials." });
//     }
//   },

//   addExchange: async (req: Request, res: Response) => {
//     try {
//       const { email, password } = req.body;
//       if (!email || !password) {
//         return res
//           .status(400)
//           .json({ message: "Email and password are required." });
//       }
//       const user = await prisma.user.create({
//         data: { exchangeEmail: email, exchangePassword: password },
//       });
//       res.status(201).json({ message: "Exchange credentials added.", user });
//     } catch (error) {
//       console.error("Error adding Exchange credentials:", error);
//       res.status(500).json({ message: "Failed to add Exchange credentials." });
//     }
//   },
// };
import { Request, Response } from "express";
import { PrismaClient, CredentialType } from "@prisma/client";

const prisma = new PrismaClient();

export const emailControllers = {
  addEmailCredential: async (req: Request, res: Response) => {
    try {
      const { email, password, credentialType } = req.body;

      if (!email || !password || !credentialType) {
        return res.status(400).json({
          message: "Email, password, and credential type are required.",
        });
      }

      if (!Object.values(CredentialType).includes(credentialType)) {
        return res.status(400).json({ message: "Invalid credential type." });
      }

      const fieldMappings = {
        GMAIL: { gmailEmail: email, gmailPassword: password },
        OFFICE: { officeEmail: email, officePassword: password },
        OUTLOOK: { outlookEmail: email, outlookPassword: password },
        EXCHANGE: { exchangeEmail: email, exchangePassword: password },
        YAHOO: { yahooEmail: email, yahooPassword: password },
        ICLOUD: { icloudEmail: email, icloudPassword: password },
        AOL: { aolEmail: email, aolPassword: password },
      };

      const user = await prisma.user.create({
        data: {
          ...fieldMappings[credentialType as keyof typeof fieldMappings],
          credentialType,
        },
      });

      res
        .status(201)
        .json({ message: `${credentialType} credentials added.`, user });
    } catch (error) {
      console.error("Error adding credentials:", error);
      res.status(500).json({ message: "Failed to add credentials." });
    }
  },
};
//send email
