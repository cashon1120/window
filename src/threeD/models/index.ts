/* eslint-disable @typescript-eslint/no-explicit-any */

import * as GPN11501 from "./GPN11501";
import * as GPN11503 from "./GPN11503";
import * as BYX01 from "./BYX01";
import * as GPN11502 from "./GPN11502"
import LeftHandle from "./ironware/LeftHandle";

/**
 * 每添加一个模型就从这里导出去
*/

const models: any = {
    GPN11501,
    GPN11503,
    BYX01,
    GPN11502,
    LeftHandle
}

export default models