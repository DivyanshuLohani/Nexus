export class PlanRequiredError extends Error {
  constructor(message = "You need a plan to perform this action") {
    super(message);
    this.name = "PlanRequiredError";
  }
}
