import { isOnline, isRoot } from "../utils";

interface Requirement {
  name: string;
  status: boolean;
}

const checkRequirementsUseCase = async () => {
  const requirements: Requirement[] = [];

  const promises = [isOnline(), isRoot()];

  const results = await Promise.all(promises);

  return results;
};

export { checkRequirementsUseCase };
