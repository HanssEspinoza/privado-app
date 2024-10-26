export interface TestCase {
  id: number;
  name: string;
  expectedResult: string;
  description?: string;
  testPlanId: number;
}
