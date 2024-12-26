import { Pegawai } from "@prisma/client";

export interface PersonnelInterface extends Omit<Pegawai, "id" | "numericRank"> {}
