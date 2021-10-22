import { test as localTest } from "./Test4Ts";
import { test as networkTest } from "./TestByHttp";

async function main() {
    localTest()
    console.log('====================== http test ======================')
    await networkTest();
}

main();