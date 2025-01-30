"use server";

import { ModuleRepositoryImpl } from "@/infrastructure/repositories/ModuleRepositoryImpl";
import { ModuleService } from "@/services/ModuleService";

const moduleService = new ModuleService(new ModuleRepositoryImpl());

export async function getAllModules() {
    return moduleService.getAllModules();
}