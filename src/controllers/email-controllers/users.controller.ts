import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await prisma.user.findMany();

    const response = res as Response;

    response.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    const response = res as Response;
    response.status(500).json({ message: "Internal server error." });
  }
};

export const addEmailCredential = async (req: Request, res: Response) => {
  try {
    const { email, password, credentialType } = req.body;

    if (!email || !password || !credentialType) {
      return res.status(400).json({
        message: "Email, password, and credential type are required.",
      });
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
};
//send email
