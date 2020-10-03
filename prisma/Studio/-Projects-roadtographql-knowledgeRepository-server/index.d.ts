import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw }

/**
 * Prisma Client JS version: 2.8.0
 * Query Engine version: e6c9b4b2b7fa162d0d459d1863321f547498fcfe
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
  GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
  : never

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */


export type PrismaAction =
  | 'findOne'
  | 'findMany'
  | 'findFirst'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string
  action: PrismaAction
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Lessons
 * const lessons = await prisma.lessons.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Lessons
   * const lessons = await prisma.lessons.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$queryRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * Execute queries in a transaction
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   */
  $transaction: PromiseConstructor['all']
  /**
   * @deprecated renamed to `$transaction`
   */
  transaction: PromiseConstructor['all']

  /**
   * `prisma.lessons`: Exposes CRUD operations for the **Lessons** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Lessons
    * const lessons = await prisma.lessons.findMany()
    * ```
    */
  get lessons(): LessonsDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const LessonsDistinctFieldEnum: {
  id: 'id',
  createdAt: 'createdAt',
  description: 'description'
};

export declare type LessonsDistinctFieldEnum = (typeof LessonsDistinctFieldEnum)[keyof typeof LessonsDistinctFieldEnum]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]



/**
 * Model Lessons
 */

export type Lessons = {
  id: number
  createdAt: Date
  description: string
}


export type AggregateLessons = {
  count: number
  avg: LessonsAvgAggregateOutputType | null
  sum: LessonsSumAggregateOutputType | null
  min: LessonsMinAggregateOutputType | null
  max: LessonsMaxAggregateOutputType | null
}

export type LessonsAvgAggregateOutputType = {
  id: number
}

export type LessonsSumAggregateOutputType = {
  id: number
}

export type LessonsMinAggregateOutputType = {
  id: number
}

export type LessonsMaxAggregateOutputType = {
  id: number
}


export type LessonsAvgAggregateInputType = {
  id?: true
}

export type LessonsSumAggregateInputType = {
  id?: true
}

export type LessonsMinAggregateInputType = {
  id?: true
}

export type LessonsMaxAggregateInputType = {
  id?: true
}

export type AggregateLessonsArgs = {
  where?: LessonsWhereInput
  orderBy?: Enumerable<LessonsOrderByInput> | LessonsOrderByInput
  cursor?: LessonsWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<LessonsDistinctFieldEnum>
  count?: true
  avg?: LessonsAvgAggregateInputType
  sum?: LessonsSumAggregateInputType
  min?: LessonsMinAggregateInputType
  max?: LessonsMaxAggregateInputType
}

export type GetLessonsAggregateType<T extends AggregateLessonsArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetLessonsAggregateScalarType<T[P]>
}

export type GetLessonsAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof LessonsAvgAggregateOutputType ? LessonsAvgAggregateOutputType[P] : never
}
    
    

export type LessonsSelect = {
  id?: boolean
  createdAt?: boolean
  description?: boolean
}

export type LessonsGetPayload<
  S extends boolean | null | undefined | LessonsArgs,
  U = keyof S
> = S extends true
  ? Lessons
  : S extends undefined
  ? never
  : S extends LessonsArgs | FindManyLessonsArgs
  ? 'include' extends U
    ? Lessons 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Lessons ? Lessons[P]
: 
 never
    }
  : Lessons
: Lessons


export interface LessonsDelegate {
  /**
   * Find zero or one Lessons that matches the filter.
   * @param {FindOneLessonsArgs} args - Arguments to find a Lessons
   * @example
   * // Get one Lessons
   * const lessons = await prisma.lessons.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneLessonsArgs>(
    args: Subset<T, FindOneLessonsArgs>
  ): CheckSelect<T, Prisma__LessonsClient<Lessons | null>, Prisma__LessonsClient<LessonsGetPayload<T> | null>>
  /**
   * Find the first Lessons that matches the filter.
   * @param {FindFirstLessonsArgs} args - Arguments to find a Lessons
   * @example
   * // Get one Lessons
   * const lessons = await prisma.lessons.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstLessonsArgs>(
    args: Subset<T, FindFirstLessonsArgs>
  ): CheckSelect<T, Prisma__LessonsClient<Lessons>, Prisma__LessonsClient<LessonsGetPayload<T>>>
  /**
   * Find zero or more Lessons that matches the filter.
   * @param {FindManyLessonsArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Lessons
   * const lessons = await prisma.lessons.findMany()
   * 
   * // Get first 10 Lessons
   * const lessons = await prisma.lessons.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const lessonsWithIdOnly = await prisma.lessons.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyLessonsArgs>(
    args?: Subset<T, FindManyLessonsArgs>
  ): CheckSelect<T, Promise<Array<Lessons>>, Promise<Array<LessonsGetPayload<T>>>>
  /**
   * Create a Lessons.
   * @param {LessonsCreateArgs} args - Arguments to create a Lessons.
   * @example
   * // Create one Lessons
   * const Lessons = await prisma.lessons.create({
   *   data: {
   *     // ... data to create a Lessons
   *   }
   * })
   * 
  **/
  create<T extends LessonsCreateArgs>(
    args: Subset<T, LessonsCreateArgs>
  ): CheckSelect<T, Prisma__LessonsClient<Lessons>, Prisma__LessonsClient<LessonsGetPayload<T>>>
  /**
   * Delete a Lessons.
   * @param {LessonsDeleteArgs} args - Arguments to delete one Lessons.
   * @example
   * // Delete one Lessons
   * const Lessons = await prisma.lessons.delete({
   *   where: {
   *     // ... filter to delete one Lessons
   *   }
   * })
   * 
  **/
  delete<T extends LessonsDeleteArgs>(
    args: Subset<T, LessonsDeleteArgs>
  ): CheckSelect<T, Prisma__LessonsClient<Lessons>, Prisma__LessonsClient<LessonsGetPayload<T>>>
  /**
   * Update one Lessons.
   * @param {LessonsUpdateArgs} args - Arguments to update one Lessons.
   * @example
   * // Update one Lessons
   * const lessons = await prisma.lessons.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends LessonsUpdateArgs>(
    args: Subset<T, LessonsUpdateArgs>
  ): CheckSelect<T, Prisma__LessonsClient<Lessons>, Prisma__LessonsClient<LessonsGetPayload<T>>>
  /**
   * Delete zero or more Lessons.
   * @param {LessonsDeleteManyArgs} args - Arguments to filter Lessons to delete.
   * @example
   * // Delete a few Lessons
   * const { count } = await prisma.lessons.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends LessonsDeleteManyArgs>(
    args: Subset<T, LessonsDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Lessons.
   * @param {LessonsUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Lessons
   * const lessons = await prisma.lessons.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends LessonsUpdateManyArgs>(
    args: Subset<T, LessonsUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Lessons.
   * @param {LessonsUpsertArgs} args - Arguments to update or create a Lessons.
   * @example
   * // Update or create a Lessons
   * const lessons = await prisma.lessons.upsert({
   *   create: {
   *     // ... data to create a Lessons
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Lessons we want to update
   *   }
   * })
  **/
  upsert<T extends LessonsUpsertArgs>(
    args: Subset<T, LessonsUpsertArgs>
  ): CheckSelect<T, Prisma__LessonsClient<Lessons>, Prisma__LessonsClient<LessonsGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyLessonsArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateLessonsArgs>(args: Subset<T, AggregateLessonsArgs>): Promise<GetLessonsAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Lessons.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__LessonsClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Lessons findOne
 */
export type FindOneLessonsArgs = {
  /**
   * Select specific fields to fetch from the Lessons
  **/
  select?: LessonsSelect | null
  /**
   * Filter, which Lessons to fetch.
  **/
  where: LessonsWhereUniqueInput
}


/**
 * Lessons findFirst
 */
export type FindFirstLessonsArgs = {
  /**
   * Select specific fields to fetch from the Lessons
  **/
  select?: LessonsSelect | null
  /**
   * Filter, which Lessons to fetch.
  **/
  where?: LessonsWhereInput
  orderBy?: Enumerable<LessonsOrderByInput> | LessonsOrderByInput
  cursor?: LessonsWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<LessonsDistinctFieldEnum>
}


/**
 * Lessons findMany
 */
export type FindManyLessonsArgs = {
  /**
   * Select specific fields to fetch from the Lessons
  **/
  select?: LessonsSelect | null
  /**
   * Filter, which Lessons to fetch.
  **/
  where?: LessonsWhereInput
  /**
   * Determine the order of the Lessons to fetch.
  **/
  orderBy?: Enumerable<LessonsOrderByInput> | LessonsOrderByInput
  /**
   * Sets the position for listing Lessons.
  **/
  cursor?: LessonsWhereUniqueInput
  /**
   * The number of Lessons to fetch. If negative number, it will take Lessons before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Lessons.
  **/
  skip?: number
  distinct?: Enumerable<LessonsDistinctFieldEnum>
}


/**
 * Lessons create
 */
export type LessonsCreateArgs = {
  /**
   * Select specific fields to fetch from the Lessons
  **/
  select?: LessonsSelect | null
  /**
   * The data needed to create a Lessons.
  **/
  data: LessonsCreateInput
}


/**
 * Lessons update
 */
export type LessonsUpdateArgs = {
  /**
   * Select specific fields to fetch from the Lessons
  **/
  select?: LessonsSelect | null
  /**
   * The data needed to update a Lessons.
  **/
  data: LessonsUpdateInput
  /**
   * Choose, which Lessons to update.
  **/
  where: LessonsWhereUniqueInput
}


/**
 * Lessons updateMany
 */
export type LessonsUpdateManyArgs = {
  data: LessonsUpdateManyMutationInput
  where?: LessonsWhereInput
}


/**
 * Lessons upsert
 */
export type LessonsUpsertArgs = {
  /**
   * Select specific fields to fetch from the Lessons
  **/
  select?: LessonsSelect | null
  /**
   * The filter to search for the Lessons to update in case it exists.
  **/
  where: LessonsWhereUniqueInput
  /**
   * In case the Lessons found by the `where` argument doesn't exist, create a new Lessons with this data.
  **/
  create: LessonsCreateInput
  /**
   * In case the Lessons was found with the provided `where` argument, update it with this data.
  **/
  update: LessonsUpdateInput
}


/**
 * Lessons delete
 */
export type LessonsDeleteArgs = {
  /**
   * Select specific fields to fetch from the Lessons
  **/
  select?: LessonsSelect | null
  /**
   * Filter which Lessons to delete.
  **/
  where: LessonsWhereUniqueInput
}


/**
 * Lessons deleteMany
 */
export type LessonsDeleteManyArgs = {
  where?: LessonsWhereInput
}


/**
 * Lessons without action
 */
export type LessonsArgs = {
  /**
   * Select specific fields to fetch from the Lessons
  **/
  select?: LessonsSelect | null
}



/**
 * Deep Input Types
 */


export type LessonsWhereInput = {
  AND?: LessonsWhereInput | Enumerable<LessonsWhereInput>
  OR?: LessonsWhereInput | Enumerable<LessonsWhereInput>
  NOT?: LessonsWhereInput | Enumerable<LessonsWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  description?: StringFilter | string
}

export type LessonsOrderByInput = {
  id?: SortOrder
  createdAt?: SortOrder
  description?: SortOrder
}

export type LessonsWhereUniqueInput = {
  id?: number
}

export type LessonsCreateInput = {
  createdAt?: Date | string
  description: string
}

export type LessonsUpdateInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
}

export type LessonsUpdateManyMutationInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
}

export type IntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type DateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type StringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringFilter
}

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type NestedIntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type NestedDateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type NestedStringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringFilter
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
