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
 * const lessons = await prisma.lesson.findMany()
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
   * const lessons = await prisma.lesson.findMany()
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
   * `prisma.lesson`: Exposes CRUD operations for the **Lesson** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Lessons
    * const lessons = await prisma.lesson.findMany()
    * ```
    */
  get lesson(): LessonDelegate;

  /**
   * `prisma.multimedia`: Exposes CRUD operations for the **Multimedia** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Multimedias
    * const multimedias = await prisma.multimedia.findMany()
    * ```
    */
  get multimedia(): MultimediaDelegate;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;

  /**
   * `prisma.watchSymbols`: Exposes CRUD operations for the **WatchSymbols** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WatchSymbols
    * const watchSymbols = await prisma.watchSymbols.findMany()
    * ```
    */
  get watchSymbols(): WatchSymbolsDelegate;

  /**
   * `prisma.sms`: Exposes CRUD operations for the **sms** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sms
    * const sms = await prisma.sms.findMany()
    * ```
    */
  get sms(): smsDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const LessonDistinctFieldEnum: {
  id: 'id',
  createdAt: 'createdAt',
  description: 'description',
  postedById: 'postedById'
};

export declare type LessonDistinctFieldEnum = (typeof LessonDistinctFieldEnum)[keyof typeof LessonDistinctFieldEnum]


export declare const MultimediaDistinctFieldEnum: {
  id: 'id',
  url: 'url',
  createdAt: 'createdAt',
  lessonId: 'lessonId'
};

export declare type MultimediaDistinctFieldEnum = (typeof MultimediaDistinctFieldEnum)[keyof typeof MultimediaDistinctFieldEnum]


export declare const UserDistinctFieldEnum: {
  id: 'id',
  name: 'name',
  email: 'email',
  password: 'password'
};

export declare type UserDistinctFieldEnum = (typeof UserDistinctFieldEnum)[keyof typeof UserDistinctFieldEnum]


export declare const WatchSymbolsDistinctFieldEnum: {
  id: 'id',
  symbol: 'symbol',
  minAmount: 'minAmount',
  maxAmount: 'maxAmount',
  phone: 'phone',
  createdAt: 'createdAt',
  postedById: 'postedById'
};

export declare type WatchSymbolsDistinctFieldEnum = (typeof WatchSymbolsDistinctFieldEnum)[keyof typeof WatchSymbolsDistinctFieldEnum]


export declare const SmsDistinctFieldEnum: {
  id: 'id',
  msg: 'msg',
  phone: 'phone',
  createdAt: 'createdAt',
  sent: 'sent',
  status: 'status',
  onceDaily: 'onceDaily'
};

export declare type SmsDistinctFieldEnum = (typeof SmsDistinctFieldEnum)[keyof typeof SmsDistinctFieldEnum]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]



/**
 * Model Lesson
 */

export type Lesson = {
  id: number
  createdAt: Date
  description: string
  postedById: number | null
}


export type AggregateLesson = {
  count: number
  avg: LessonAvgAggregateOutputType | null
  sum: LessonSumAggregateOutputType | null
  min: LessonMinAggregateOutputType | null
  max: LessonMaxAggregateOutputType | null
}

export type LessonAvgAggregateOutputType = {
  id: number
  postedById: number | null
}

export type LessonSumAggregateOutputType = {
  id: number
  postedById: number | null
}

export type LessonMinAggregateOutputType = {
  id: number
  postedById: number | null
}

export type LessonMaxAggregateOutputType = {
  id: number
  postedById: number | null
}


export type LessonAvgAggregateInputType = {
  id?: true
  postedById?: true
}

export type LessonSumAggregateInputType = {
  id?: true
  postedById?: true
}

export type LessonMinAggregateInputType = {
  id?: true
  postedById?: true
}

export type LessonMaxAggregateInputType = {
  id?: true
  postedById?: true
}

export type AggregateLessonArgs = {
  where?: LessonWhereInput
  orderBy?: Enumerable<LessonOrderByInput> | LessonOrderByInput
  cursor?: LessonWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<LessonDistinctFieldEnum>
  count?: true
  avg?: LessonAvgAggregateInputType
  sum?: LessonSumAggregateInputType
  min?: LessonMinAggregateInputType
  max?: LessonMaxAggregateInputType
}

export type GetLessonAggregateType<T extends AggregateLessonArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetLessonAggregateScalarType<T[P]>
}

export type GetLessonAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof LessonAvgAggregateOutputType ? LessonAvgAggregateOutputType[P] : never
}
    
    

export type LessonSelect = {
  id?: boolean
  createdAt?: boolean
  description?: boolean
  postedById?: boolean
  postedBy?: boolean | UserArgs
  multimedia?: boolean | FindManyMultimediaArgs
}

export type LessonInclude = {
  postedBy?: boolean | UserArgs
  multimedia?: boolean | FindManyMultimediaArgs
}

export type LessonGetPayload<
  S extends boolean | null | undefined | LessonArgs,
  U = keyof S
> = S extends true
  ? Lesson
  : S extends undefined
  ? never
  : S extends LessonArgs | FindManyLessonArgs
  ? 'include' extends U
    ? Lesson  & {
      [P in TrueKeys<S['include']>]:
      P extends 'postedBy'
      ? UserGetPayload<S['include'][P]> | null :
      P extends 'multimedia'
      ? Array<MultimediaGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Lesson ? Lesson[P]
: 
      P extends 'postedBy'
      ? UserGetPayload<S['select'][P]> | null :
      P extends 'multimedia'
      ? Array<MultimediaGetPayload<S['select'][P]>> : never
    }
  : Lesson
: Lesson


export interface LessonDelegate {
  /**
   * Find zero or one Lesson that matches the filter.
   * @param {FindOneLessonArgs} args - Arguments to find a Lesson
   * @example
   * // Get one Lesson
   * const lesson = await prisma.lesson.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneLessonArgs>(
    args: Subset<T, FindOneLessonArgs>
  ): CheckSelect<T, Prisma__LessonClient<Lesson | null>, Prisma__LessonClient<LessonGetPayload<T> | null>>
  /**
   * Find the first Lesson that matches the filter.
   * @param {FindFirstLessonArgs} args - Arguments to find a Lesson
   * @example
   * // Get one Lesson
   * const lesson = await prisma.lesson.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstLessonArgs>(
    args: Subset<T, FindFirstLessonArgs>
  ): CheckSelect<T, Prisma__LessonClient<Lesson>, Prisma__LessonClient<LessonGetPayload<T>>>
  /**
   * Find zero or more Lessons that matches the filter.
   * @param {FindManyLessonArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Lessons
   * const lessons = await prisma.lesson.findMany()
   * 
   * // Get first 10 Lessons
   * const lessons = await prisma.lesson.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const lessonWithIdOnly = await prisma.lesson.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyLessonArgs>(
    args?: Subset<T, FindManyLessonArgs>
  ): CheckSelect<T, Promise<Array<Lesson>>, Promise<Array<LessonGetPayload<T>>>>
  /**
   * Create a Lesson.
   * @param {LessonCreateArgs} args - Arguments to create a Lesson.
   * @example
   * // Create one Lesson
   * const Lesson = await prisma.lesson.create({
   *   data: {
   *     // ... data to create a Lesson
   *   }
   * })
   * 
  **/
  create<T extends LessonCreateArgs>(
    args: Subset<T, LessonCreateArgs>
  ): CheckSelect<T, Prisma__LessonClient<Lesson>, Prisma__LessonClient<LessonGetPayload<T>>>
  /**
   * Delete a Lesson.
   * @param {LessonDeleteArgs} args - Arguments to delete one Lesson.
   * @example
   * // Delete one Lesson
   * const Lesson = await prisma.lesson.delete({
   *   where: {
   *     // ... filter to delete one Lesson
   *   }
   * })
   * 
  **/
  delete<T extends LessonDeleteArgs>(
    args: Subset<T, LessonDeleteArgs>
  ): CheckSelect<T, Prisma__LessonClient<Lesson>, Prisma__LessonClient<LessonGetPayload<T>>>
  /**
   * Update one Lesson.
   * @param {LessonUpdateArgs} args - Arguments to update one Lesson.
   * @example
   * // Update one Lesson
   * const lesson = await prisma.lesson.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends LessonUpdateArgs>(
    args: Subset<T, LessonUpdateArgs>
  ): CheckSelect<T, Prisma__LessonClient<Lesson>, Prisma__LessonClient<LessonGetPayload<T>>>
  /**
   * Delete zero or more Lessons.
   * @param {LessonDeleteManyArgs} args - Arguments to filter Lessons to delete.
   * @example
   * // Delete a few Lessons
   * const { count } = await prisma.lesson.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends LessonDeleteManyArgs>(
    args: Subset<T, LessonDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Lessons.
   * @param {LessonUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Lessons
   * const lesson = await prisma.lesson.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends LessonUpdateManyArgs>(
    args: Subset<T, LessonUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Lesson.
   * @param {LessonUpsertArgs} args - Arguments to update or create a Lesson.
   * @example
   * // Update or create a Lesson
   * const lesson = await prisma.lesson.upsert({
   *   create: {
   *     // ... data to create a Lesson
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Lesson we want to update
   *   }
   * })
  **/
  upsert<T extends LessonUpsertArgs>(
    args: Subset<T, LessonUpsertArgs>
  ): CheckSelect<T, Prisma__LessonClient<Lesson>, Prisma__LessonClient<LessonGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyLessonArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateLessonArgs>(args: Subset<T, AggregateLessonArgs>): Promise<GetLessonAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Lesson.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__LessonClient<T> implements Promise<T> {
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

  postedBy<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  multimedia<T extends FindManyMultimediaArgs = {}>(args?: Subset<T, FindManyMultimediaArgs>): CheckSelect<T, Promise<Array<Multimedia>>, Promise<Array<MultimediaGetPayload<T>>>>;

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
 * Lesson findOne
 */
export type FindOneLessonArgs = {
  /**
   * Select specific fields to fetch from the Lesson
  **/
  select?: LessonSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LessonInclude | null
  /**
   * Filter, which Lesson to fetch.
  **/
  where: LessonWhereUniqueInput
}


/**
 * Lesson findFirst
 */
export type FindFirstLessonArgs = {
  /**
   * Select specific fields to fetch from the Lesson
  **/
  select?: LessonSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LessonInclude | null
  /**
   * Filter, which Lesson to fetch.
  **/
  where?: LessonWhereInput
  orderBy?: Enumerable<LessonOrderByInput> | LessonOrderByInput
  cursor?: LessonWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<LessonDistinctFieldEnum>
}


/**
 * Lesson findMany
 */
export type FindManyLessonArgs = {
  /**
   * Select specific fields to fetch from the Lesson
  **/
  select?: LessonSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LessonInclude | null
  /**
   * Filter, which Lessons to fetch.
  **/
  where?: LessonWhereInput
  /**
   * Determine the order of the Lessons to fetch.
  **/
  orderBy?: Enumerable<LessonOrderByInput> | LessonOrderByInput
  /**
   * Sets the position for listing Lessons.
  **/
  cursor?: LessonWhereUniqueInput
  /**
   * The number of Lessons to fetch. If negative number, it will take Lessons before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Lessons.
  **/
  skip?: number
  distinct?: Enumerable<LessonDistinctFieldEnum>
}


/**
 * Lesson create
 */
export type LessonCreateArgs = {
  /**
   * Select specific fields to fetch from the Lesson
  **/
  select?: LessonSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LessonInclude | null
  /**
   * The data needed to create a Lesson.
  **/
  data: LessonCreateInput
}


/**
 * Lesson update
 */
export type LessonUpdateArgs = {
  /**
   * Select specific fields to fetch from the Lesson
  **/
  select?: LessonSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LessonInclude | null
  /**
   * The data needed to update a Lesson.
  **/
  data: LessonUpdateInput
  /**
   * Choose, which Lesson to update.
  **/
  where: LessonWhereUniqueInput
}


/**
 * Lesson updateMany
 */
export type LessonUpdateManyArgs = {
  data: LessonUpdateManyMutationInput
  where?: LessonWhereInput
}


/**
 * Lesson upsert
 */
export type LessonUpsertArgs = {
  /**
   * Select specific fields to fetch from the Lesson
  **/
  select?: LessonSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LessonInclude | null
  /**
   * The filter to search for the Lesson to update in case it exists.
  **/
  where: LessonWhereUniqueInput
  /**
   * In case the Lesson found by the `where` argument doesn't exist, create a new Lesson with this data.
  **/
  create: LessonCreateInput
  /**
   * In case the Lesson was found with the provided `where` argument, update it with this data.
  **/
  update: LessonUpdateInput
}


/**
 * Lesson delete
 */
export type LessonDeleteArgs = {
  /**
   * Select specific fields to fetch from the Lesson
  **/
  select?: LessonSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LessonInclude | null
  /**
   * Filter which Lesson to delete.
  **/
  where: LessonWhereUniqueInput
}


/**
 * Lesson deleteMany
 */
export type LessonDeleteManyArgs = {
  where?: LessonWhereInput
}


/**
 * Lesson without action
 */
export type LessonArgs = {
  /**
   * Select specific fields to fetch from the Lesson
  **/
  select?: LessonSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LessonInclude | null
}



/**
 * Model Multimedia
 */

export type Multimedia = {
  id: number
  url: string
  createdAt: Date
  lessonId: number | null
}


export type AggregateMultimedia = {
  count: number
  avg: MultimediaAvgAggregateOutputType | null
  sum: MultimediaSumAggregateOutputType | null
  min: MultimediaMinAggregateOutputType | null
  max: MultimediaMaxAggregateOutputType | null
}

export type MultimediaAvgAggregateOutputType = {
  id: number
  lessonId: number | null
}

export type MultimediaSumAggregateOutputType = {
  id: number
  lessonId: number | null
}

export type MultimediaMinAggregateOutputType = {
  id: number
  lessonId: number | null
}

export type MultimediaMaxAggregateOutputType = {
  id: number
  lessonId: number | null
}


export type MultimediaAvgAggregateInputType = {
  id?: true
  lessonId?: true
}

export type MultimediaSumAggregateInputType = {
  id?: true
  lessonId?: true
}

export type MultimediaMinAggregateInputType = {
  id?: true
  lessonId?: true
}

export type MultimediaMaxAggregateInputType = {
  id?: true
  lessonId?: true
}

export type AggregateMultimediaArgs = {
  where?: MultimediaWhereInput
  orderBy?: Enumerable<MultimediaOrderByInput> | MultimediaOrderByInput
  cursor?: MultimediaWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<MultimediaDistinctFieldEnum>
  count?: true
  avg?: MultimediaAvgAggregateInputType
  sum?: MultimediaSumAggregateInputType
  min?: MultimediaMinAggregateInputType
  max?: MultimediaMaxAggregateInputType
}

export type GetMultimediaAggregateType<T extends AggregateMultimediaArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetMultimediaAggregateScalarType<T[P]>
}

export type GetMultimediaAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof MultimediaAvgAggregateOutputType ? MultimediaAvgAggregateOutputType[P] : never
}
    
    

export type MultimediaSelect = {
  id?: boolean
  url?: boolean
  createdAt?: boolean
  lesson?: boolean | LessonArgs
  lessonId?: boolean
}

export type MultimediaInclude = {
  lesson?: boolean | LessonArgs
}

export type MultimediaGetPayload<
  S extends boolean | null | undefined | MultimediaArgs,
  U = keyof S
> = S extends true
  ? Multimedia
  : S extends undefined
  ? never
  : S extends MultimediaArgs | FindManyMultimediaArgs
  ? 'include' extends U
    ? Multimedia  & {
      [P in TrueKeys<S['include']>]:
      P extends 'lesson'
      ? LessonGetPayload<S['include'][P]> | null : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Multimedia ? Multimedia[P]
: 
      P extends 'lesson'
      ? LessonGetPayload<S['select'][P]> | null : never
    }
  : Multimedia
: Multimedia


export interface MultimediaDelegate {
  /**
   * Find zero or one Multimedia that matches the filter.
   * @param {FindOneMultimediaArgs} args - Arguments to find a Multimedia
   * @example
   * // Get one Multimedia
   * const multimedia = await prisma.multimedia.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneMultimediaArgs>(
    args: Subset<T, FindOneMultimediaArgs>
  ): CheckSelect<T, Prisma__MultimediaClient<Multimedia | null>, Prisma__MultimediaClient<MultimediaGetPayload<T> | null>>
  /**
   * Find the first Multimedia that matches the filter.
   * @param {FindFirstMultimediaArgs} args - Arguments to find a Multimedia
   * @example
   * // Get one Multimedia
   * const multimedia = await prisma.multimedia.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstMultimediaArgs>(
    args: Subset<T, FindFirstMultimediaArgs>
  ): CheckSelect<T, Prisma__MultimediaClient<Multimedia>, Prisma__MultimediaClient<MultimediaGetPayload<T>>>
  /**
   * Find zero or more Multimedias that matches the filter.
   * @param {FindManyMultimediaArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Multimedias
   * const multimedias = await prisma.multimedia.findMany()
   * 
   * // Get first 10 Multimedias
   * const multimedias = await prisma.multimedia.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const multimediaWithIdOnly = await prisma.multimedia.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyMultimediaArgs>(
    args?: Subset<T, FindManyMultimediaArgs>
  ): CheckSelect<T, Promise<Array<Multimedia>>, Promise<Array<MultimediaGetPayload<T>>>>
  /**
   * Create a Multimedia.
   * @param {MultimediaCreateArgs} args - Arguments to create a Multimedia.
   * @example
   * // Create one Multimedia
   * const Multimedia = await prisma.multimedia.create({
   *   data: {
   *     // ... data to create a Multimedia
   *   }
   * })
   * 
  **/
  create<T extends MultimediaCreateArgs>(
    args: Subset<T, MultimediaCreateArgs>
  ): CheckSelect<T, Prisma__MultimediaClient<Multimedia>, Prisma__MultimediaClient<MultimediaGetPayload<T>>>
  /**
   * Delete a Multimedia.
   * @param {MultimediaDeleteArgs} args - Arguments to delete one Multimedia.
   * @example
   * // Delete one Multimedia
   * const Multimedia = await prisma.multimedia.delete({
   *   where: {
   *     // ... filter to delete one Multimedia
   *   }
   * })
   * 
  **/
  delete<T extends MultimediaDeleteArgs>(
    args: Subset<T, MultimediaDeleteArgs>
  ): CheckSelect<T, Prisma__MultimediaClient<Multimedia>, Prisma__MultimediaClient<MultimediaGetPayload<T>>>
  /**
   * Update one Multimedia.
   * @param {MultimediaUpdateArgs} args - Arguments to update one Multimedia.
   * @example
   * // Update one Multimedia
   * const multimedia = await prisma.multimedia.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends MultimediaUpdateArgs>(
    args: Subset<T, MultimediaUpdateArgs>
  ): CheckSelect<T, Prisma__MultimediaClient<Multimedia>, Prisma__MultimediaClient<MultimediaGetPayload<T>>>
  /**
   * Delete zero or more Multimedias.
   * @param {MultimediaDeleteManyArgs} args - Arguments to filter Multimedias to delete.
   * @example
   * // Delete a few Multimedias
   * const { count } = await prisma.multimedia.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends MultimediaDeleteManyArgs>(
    args: Subset<T, MultimediaDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Multimedias.
   * @param {MultimediaUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Multimedias
   * const multimedia = await prisma.multimedia.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends MultimediaUpdateManyArgs>(
    args: Subset<T, MultimediaUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Multimedia.
   * @param {MultimediaUpsertArgs} args - Arguments to update or create a Multimedia.
   * @example
   * // Update or create a Multimedia
   * const multimedia = await prisma.multimedia.upsert({
   *   create: {
   *     // ... data to create a Multimedia
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Multimedia we want to update
   *   }
   * })
  **/
  upsert<T extends MultimediaUpsertArgs>(
    args: Subset<T, MultimediaUpsertArgs>
  ): CheckSelect<T, Prisma__MultimediaClient<Multimedia>, Prisma__MultimediaClient<MultimediaGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyMultimediaArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateMultimediaArgs>(args: Subset<T, AggregateMultimediaArgs>): Promise<GetMultimediaAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Multimedia.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__MultimediaClient<T> implements Promise<T> {
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

  lesson<T extends LessonArgs = {}>(args?: Subset<T, LessonArgs>): CheckSelect<T, Prisma__LessonClient<Lesson | null>, Prisma__LessonClient<LessonGetPayload<T> | null>>;

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
 * Multimedia findOne
 */
export type FindOneMultimediaArgs = {
  /**
   * Select specific fields to fetch from the Multimedia
  **/
  select?: MultimediaSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MultimediaInclude | null
  /**
   * Filter, which Multimedia to fetch.
  **/
  where: MultimediaWhereUniqueInput
}


/**
 * Multimedia findFirst
 */
export type FindFirstMultimediaArgs = {
  /**
   * Select specific fields to fetch from the Multimedia
  **/
  select?: MultimediaSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MultimediaInclude | null
  /**
   * Filter, which Multimedia to fetch.
  **/
  where?: MultimediaWhereInput
  orderBy?: Enumerable<MultimediaOrderByInput> | MultimediaOrderByInput
  cursor?: MultimediaWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<MultimediaDistinctFieldEnum>
}


/**
 * Multimedia findMany
 */
export type FindManyMultimediaArgs = {
  /**
   * Select specific fields to fetch from the Multimedia
  **/
  select?: MultimediaSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MultimediaInclude | null
  /**
   * Filter, which Multimedias to fetch.
  **/
  where?: MultimediaWhereInput
  /**
   * Determine the order of the Multimedias to fetch.
  **/
  orderBy?: Enumerable<MultimediaOrderByInput> | MultimediaOrderByInput
  /**
   * Sets the position for listing Multimedias.
  **/
  cursor?: MultimediaWhereUniqueInput
  /**
   * The number of Multimedias to fetch. If negative number, it will take Multimedias before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Multimedias.
  **/
  skip?: number
  distinct?: Enumerable<MultimediaDistinctFieldEnum>
}


/**
 * Multimedia create
 */
export type MultimediaCreateArgs = {
  /**
   * Select specific fields to fetch from the Multimedia
  **/
  select?: MultimediaSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MultimediaInclude | null
  /**
   * The data needed to create a Multimedia.
  **/
  data: MultimediaCreateInput
}


/**
 * Multimedia update
 */
export type MultimediaUpdateArgs = {
  /**
   * Select specific fields to fetch from the Multimedia
  **/
  select?: MultimediaSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MultimediaInclude | null
  /**
   * The data needed to update a Multimedia.
  **/
  data: MultimediaUpdateInput
  /**
   * Choose, which Multimedia to update.
  **/
  where: MultimediaWhereUniqueInput
}


/**
 * Multimedia updateMany
 */
export type MultimediaUpdateManyArgs = {
  data: MultimediaUpdateManyMutationInput
  where?: MultimediaWhereInput
}


/**
 * Multimedia upsert
 */
export type MultimediaUpsertArgs = {
  /**
   * Select specific fields to fetch from the Multimedia
  **/
  select?: MultimediaSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MultimediaInclude | null
  /**
   * The filter to search for the Multimedia to update in case it exists.
  **/
  where: MultimediaWhereUniqueInput
  /**
   * In case the Multimedia found by the `where` argument doesn't exist, create a new Multimedia with this data.
  **/
  create: MultimediaCreateInput
  /**
   * In case the Multimedia was found with the provided `where` argument, update it with this data.
  **/
  update: MultimediaUpdateInput
}


/**
 * Multimedia delete
 */
export type MultimediaDeleteArgs = {
  /**
   * Select specific fields to fetch from the Multimedia
  **/
  select?: MultimediaSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MultimediaInclude | null
  /**
   * Filter which Multimedia to delete.
  **/
  where: MultimediaWhereUniqueInput
}


/**
 * Multimedia deleteMany
 */
export type MultimediaDeleteManyArgs = {
  where?: MultimediaWhereInput
}


/**
 * Multimedia without action
 */
export type MultimediaArgs = {
  /**
   * Select specific fields to fetch from the Multimedia
  **/
  select?: MultimediaSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MultimediaInclude | null
}



/**
 * Model User
 */

export type User = {
  id: number
  name: string
  email: string
  password: string
}


export type AggregateUser = {
  count: number
  avg: UserAvgAggregateOutputType | null
  sum: UserSumAggregateOutputType | null
  min: UserMinAggregateOutputType | null
  max: UserMaxAggregateOutputType | null
}

export type UserAvgAggregateOutputType = {
  id: number
}

export type UserSumAggregateOutputType = {
  id: number
}

export type UserMinAggregateOutputType = {
  id: number
}

export type UserMaxAggregateOutputType = {
  id: number
}


export type UserAvgAggregateInputType = {
  id?: true
}

export type UserSumAggregateInputType = {
  id?: true
}

export type UserMinAggregateInputType = {
  id?: true
}

export type UserMaxAggregateInputType = {
  id?: true
}

export type AggregateUserArgs = {
  where?: UserWhereInput
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
  count?: true
  avg?: UserAvgAggregateInputType
  sum?: UserSumAggregateInputType
  min?: UserMinAggregateInputType
  max?: UserMaxAggregateInputType
}

export type GetUserAggregateType<T extends AggregateUserArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetUserAggregateScalarType<T[P]>
}

export type GetUserAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof UserAvgAggregateOutputType ? UserAvgAggregateOutputType[P] : never
}
    
    

export type UserSelect = {
  id?: boolean
  name?: boolean
  email?: boolean
  password?: boolean
  lessons?: boolean | FindManyLessonArgs
  watchSymbols?: boolean | FindManyWatchSymbolsArgs
}

export type UserInclude = {
  lessons?: boolean | FindManyLessonArgs
  watchSymbols?: boolean | FindManyWatchSymbolsArgs
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs | FindManyUserArgs
  ? 'include' extends U
    ? User  & {
      [P in TrueKeys<S['include']>]:
      P extends 'lessons'
      ? Array<LessonGetPayload<S['include'][P]>> :
      P extends 'watchSymbols'
      ? Array<WatchSymbolsGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
      P extends 'lessons'
      ? Array<LessonGetPayload<S['select'][P]>> :
      P extends 'watchSymbols'
      ? Array<WatchSymbolsGetPayload<S['select'][P]>> : never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User that matches the filter.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find the first User that matches the filter.
   * @param {FindFirstUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstUserArgs>(
    args: Subset<T, FindFirstUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Find zero or more Users that matches the filter.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.user.findMany()
   * 
   * // Get first 10 Users
   * const users = await prisma.user.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
  /**
   * Create a User.
   * @param {UserCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const User = await prisma.user.create({
   *   data: {
   *     // ... data to create a User
   *   }
   * })
   * 
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete a User.
   * @param {UserDeleteArgs} args - Arguments to delete one User.
   * @example
   * // Delete one User
   * const User = await prisma.user.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   * 
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Update one User.
   * @param {UserUpdateArgs} args - Arguments to update one User.
   * @example
   * // Update one User
   * const user = await prisma.user.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete zero or more Users.
   * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await prisma.user.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
   * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const user = await prisma.user.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one User.
   * @param {UserUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Update or create a User
   * const user = await prisma.user.upsert({
   *   create: {
   *     // ... data to create a User
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the User we want to update
   *   }
   * })
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateUserArgs>(args: Subset<T, AggregateUserArgs>): Promise<GetUserAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UserClient<T> implements Promise<T> {
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

  lessons<T extends FindManyLessonArgs = {}>(args?: Subset<T, FindManyLessonArgs>): CheckSelect<T, Promise<Array<Lesson>>, Promise<Array<LessonGetPayload<T>>>>;

  watchSymbols<T extends FindManyWatchSymbolsArgs = {}>(args?: Subset<T, FindManyWatchSymbolsArgs>): CheckSelect<T, Promise<Array<WatchSymbols>>, Promise<Array<WatchSymbolsGetPayload<T>>>>;

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
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findFirst
 */
export type FindFirstUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where?: UserWhereInput
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  /**
   * Sets the position for listing Users.
  **/
  cursor?: UserWhereUniqueInput
  /**
   * The number of Users to fetch. If negative number, it will take Users before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Users.
  **/
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
}



/**
 * Model WatchSymbols
 */

export type WatchSymbols = {
  id: number
  symbol: string
  minAmount: string
  maxAmount: string
  phone: string
  createdAt: Date
  postedById: number | null
}


export type AggregateWatchSymbols = {
  count: number
  avg: WatchSymbolsAvgAggregateOutputType | null
  sum: WatchSymbolsSumAggregateOutputType | null
  min: WatchSymbolsMinAggregateOutputType | null
  max: WatchSymbolsMaxAggregateOutputType | null
}

export type WatchSymbolsAvgAggregateOutputType = {
  id: number
  postedById: number | null
}

export type WatchSymbolsSumAggregateOutputType = {
  id: number
  postedById: number | null
}

export type WatchSymbolsMinAggregateOutputType = {
  id: number
  postedById: number | null
}

export type WatchSymbolsMaxAggregateOutputType = {
  id: number
  postedById: number | null
}


export type WatchSymbolsAvgAggregateInputType = {
  id?: true
  postedById?: true
}

export type WatchSymbolsSumAggregateInputType = {
  id?: true
  postedById?: true
}

export type WatchSymbolsMinAggregateInputType = {
  id?: true
  postedById?: true
}

export type WatchSymbolsMaxAggregateInputType = {
  id?: true
  postedById?: true
}

export type AggregateWatchSymbolsArgs = {
  where?: WatchSymbolsWhereInput
  orderBy?: Enumerable<WatchSymbolsOrderByInput> | WatchSymbolsOrderByInput
  cursor?: WatchSymbolsWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<WatchSymbolsDistinctFieldEnum>
  count?: true
  avg?: WatchSymbolsAvgAggregateInputType
  sum?: WatchSymbolsSumAggregateInputType
  min?: WatchSymbolsMinAggregateInputType
  max?: WatchSymbolsMaxAggregateInputType
}

export type GetWatchSymbolsAggregateType<T extends AggregateWatchSymbolsArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetWatchSymbolsAggregateScalarType<T[P]>
}

export type GetWatchSymbolsAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof WatchSymbolsAvgAggregateOutputType ? WatchSymbolsAvgAggregateOutputType[P] : never
}
    
    

export type WatchSymbolsSelect = {
  id?: boolean
  symbol?: boolean
  minAmount?: boolean
  maxAmount?: boolean
  phone?: boolean
  createdAt?: boolean
  postedById?: boolean
  postedBy?: boolean | UserArgs
}

export type WatchSymbolsInclude = {
  postedBy?: boolean | UserArgs
}

export type WatchSymbolsGetPayload<
  S extends boolean | null | undefined | WatchSymbolsArgs,
  U = keyof S
> = S extends true
  ? WatchSymbols
  : S extends undefined
  ? never
  : S extends WatchSymbolsArgs | FindManyWatchSymbolsArgs
  ? 'include' extends U
    ? WatchSymbols  & {
      [P in TrueKeys<S['include']>]:
      P extends 'postedBy'
      ? UserGetPayload<S['include'][P]> | null : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof WatchSymbols ? WatchSymbols[P]
: 
      P extends 'postedBy'
      ? UserGetPayload<S['select'][P]> | null : never
    }
  : WatchSymbols
: WatchSymbols


export interface WatchSymbolsDelegate {
  /**
   * Find zero or one WatchSymbols that matches the filter.
   * @param {FindOneWatchSymbolsArgs} args - Arguments to find a WatchSymbols
   * @example
   * // Get one WatchSymbols
   * const watchSymbols = await prisma.watchSymbols.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneWatchSymbolsArgs>(
    args: Subset<T, FindOneWatchSymbolsArgs>
  ): CheckSelect<T, Prisma__WatchSymbolsClient<WatchSymbols | null>, Prisma__WatchSymbolsClient<WatchSymbolsGetPayload<T> | null>>
  /**
   * Find the first WatchSymbols that matches the filter.
   * @param {FindFirstWatchSymbolsArgs} args - Arguments to find a WatchSymbols
   * @example
   * // Get one WatchSymbols
   * const watchSymbols = await prisma.watchSymbols.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstWatchSymbolsArgs>(
    args: Subset<T, FindFirstWatchSymbolsArgs>
  ): CheckSelect<T, Prisma__WatchSymbolsClient<WatchSymbols>, Prisma__WatchSymbolsClient<WatchSymbolsGetPayload<T>>>
  /**
   * Find zero or more WatchSymbols that matches the filter.
   * @param {FindManyWatchSymbolsArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all WatchSymbols
   * const watchSymbols = await prisma.watchSymbols.findMany()
   * 
   * // Get first 10 WatchSymbols
   * const watchSymbols = await prisma.watchSymbols.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const watchSymbolsWithIdOnly = await prisma.watchSymbols.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyWatchSymbolsArgs>(
    args?: Subset<T, FindManyWatchSymbolsArgs>
  ): CheckSelect<T, Promise<Array<WatchSymbols>>, Promise<Array<WatchSymbolsGetPayload<T>>>>
  /**
   * Create a WatchSymbols.
   * @param {WatchSymbolsCreateArgs} args - Arguments to create a WatchSymbols.
   * @example
   * // Create one WatchSymbols
   * const WatchSymbols = await prisma.watchSymbols.create({
   *   data: {
   *     // ... data to create a WatchSymbols
   *   }
   * })
   * 
  **/
  create<T extends WatchSymbolsCreateArgs>(
    args: Subset<T, WatchSymbolsCreateArgs>
  ): CheckSelect<T, Prisma__WatchSymbolsClient<WatchSymbols>, Prisma__WatchSymbolsClient<WatchSymbolsGetPayload<T>>>
  /**
   * Delete a WatchSymbols.
   * @param {WatchSymbolsDeleteArgs} args - Arguments to delete one WatchSymbols.
   * @example
   * // Delete one WatchSymbols
   * const WatchSymbols = await prisma.watchSymbols.delete({
   *   where: {
   *     // ... filter to delete one WatchSymbols
   *   }
   * })
   * 
  **/
  delete<T extends WatchSymbolsDeleteArgs>(
    args: Subset<T, WatchSymbolsDeleteArgs>
  ): CheckSelect<T, Prisma__WatchSymbolsClient<WatchSymbols>, Prisma__WatchSymbolsClient<WatchSymbolsGetPayload<T>>>
  /**
   * Update one WatchSymbols.
   * @param {WatchSymbolsUpdateArgs} args - Arguments to update one WatchSymbols.
   * @example
   * // Update one WatchSymbols
   * const watchSymbols = await prisma.watchSymbols.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends WatchSymbolsUpdateArgs>(
    args: Subset<T, WatchSymbolsUpdateArgs>
  ): CheckSelect<T, Prisma__WatchSymbolsClient<WatchSymbols>, Prisma__WatchSymbolsClient<WatchSymbolsGetPayload<T>>>
  /**
   * Delete zero or more WatchSymbols.
   * @param {WatchSymbolsDeleteManyArgs} args - Arguments to filter WatchSymbols to delete.
   * @example
   * // Delete a few WatchSymbols
   * const { count } = await prisma.watchSymbols.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends WatchSymbolsDeleteManyArgs>(
    args: Subset<T, WatchSymbolsDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more WatchSymbols.
   * @param {WatchSymbolsUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many WatchSymbols
   * const watchSymbols = await prisma.watchSymbols.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends WatchSymbolsUpdateManyArgs>(
    args: Subset<T, WatchSymbolsUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one WatchSymbols.
   * @param {WatchSymbolsUpsertArgs} args - Arguments to update or create a WatchSymbols.
   * @example
   * // Update or create a WatchSymbols
   * const watchSymbols = await prisma.watchSymbols.upsert({
   *   create: {
   *     // ... data to create a WatchSymbols
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the WatchSymbols we want to update
   *   }
   * })
  **/
  upsert<T extends WatchSymbolsUpsertArgs>(
    args: Subset<T, WatchSymbolsUpsertArgs>
  ): CheckSelect<T, Prisma__WatchSymbolsClient<WatchSymbols>, Prisma__WatchSymbolsClient<WatchSymbolsGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyWatchSymbolsArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateWatchSymbolsArgs>(args: Subset<T, AggregateWatchSymbolsArgs>): Promise<GetWatchSymbolsAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for WatchSymbols.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__WatchSymbolsClient<T> implements Promise<T> {
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

  postedBy<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

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
 * WatchSymbols findOne
 */
export type FindOneWatchSymbolsArgs = {
  /**
   * Select specific fields to fetch from the WatchSymbols
  **/
  select?: WatchSymbolsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: WatchSymbolsInclude | null
  /**
   * Filter, which WatchSymbols to fetch.
  **/
  where: WatchSymbolsWhereUniqueInput
}


/**
 * WatchSymbols findFirst
 */
export type FindFirstWatchSymbolsArgs = {
  /**
   * Select specific fields to fetch from the WatchSymbols
  **/
  select?: WatchSymbolsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: WatchSymbolsInclude | null
  /**
   * Filter, which WatchSymbols to fetch.
  **/
  where?: WatchSymbolsWhereInput
  orderBy?: Enumerable<WatchSymbolsOrderByInput> | WatchSymbolsOrderByInput
  cursor?: WatchSymbolsWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<WatchSymbolsDistinctFieldEnum>
}


/**
 * WatchSymbols findMany
 */
export type FindManyWatchSymbolsArgs = {
  /**
   * Select specific fields to fetch from the WatchSymbols
  **/
  select?: WatchSymbolsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: WatchSymbolsInclude | null
  /**
   * Filter, which WatchSymbols to fetch.
  **/
  where?: WatchSymbolsWhereInput
  /**
   * Determine the order of the WatchSymbols to fetch.
  **/
  orderBy?: Enumerable<WatchSymbolsOrderByInput> | WatchSymbolsOrderByInput
  /**
   * Sets the position for listing WatchSymbols.
  **/
  cursor?: WatchSymbolsWhereUniqueInput
  /**
   * The number of WatchSymbols to fetch. If negative number, it will take WatchSymbols before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` WatchSymbols.
  **/
  skip?: number
  distinct?: Enumerable<WatchSymbolsDistinctFieldEnum>
}


/**
 * WatchSymbols create
 */
export type WatchSymbolsCreateArgs = {
  /**
   * Select specific fields to fetch from the WatchSymbols
  **/
  select?: WatchSymbolsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: WatchSymbolsInclude | null
  /**
   * The data needed to create a WatchSymbols.
  **/
  data: WatchSymbolsCreateInput
}


/**
 * WatchSymbols update
 */
export type WatchSymbolsUpdateArgs = {
  /**
   * Select specific fields to fetch from the WatchSymbols
  **/
  select?: WatchSymbolsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: WatchSymbolsInclude | null
  /**
   * The data needed to update a WatchSymbols.
  **/
  data: WatchSymbolsUpdateInput
  /**
   * Choose, which WatchSymbols to update.
  **/
  where: WatchSymbolsWhereUniqueInput
}


/**
 * WatchSymbols updateMany
 */
export type WatchSymbolsUpdateManyArgs = {
  data: WatchSymbolsUpdateManyMutationInput
  where?: WatchSymbolsWhereInput
}


/**
 * WatchSymbols upsert
 */
export type WatchSymbolsUpsertArgs = {
  /**
   * Select specific fields to fetch from the WatchSymbols
  **/
  select?: WatchSymbolsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: WatchSymbolsInclude | null
  /**
   * The filter to search for the WatchSymbols to update in case it exists.
  **/
  where: WatchSymbolsWhereUniqueInput
  /**
   * In case the WatchSymbols found by the `where` argument doesn't exist, create a new WatchSymbols with this data.
  **/
  create: WatchSymbolsCreateInput
  /**
   * In case the WatchSymbols was found with the provided `where` argument, update it with this data.
  **/
  update: WatchSymbolsUpdateInput
}


/**
 * WatchSymbols delete
 */
export type WatchSymbolsDeleteArgs = {
  /**
   * Select specific fields to fetch from the WatchSymbols
  **/
  select?: WatchSymbolsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: WatchSymbolsInclude | null
  /**
   * Filter which WatchSymbols to delete.
  **/
  where: WatchSymbolsWhereUniqueInput
}


/**
 * WatchSymbols deleteMany
 */
export type WatchSymbolsDeleteManyArgs = {
  where?: WatchSymbolsWhereInput
}


/**
 * WatchSymbols without action
 */
export type WatchSymbolsArgs = {
  /**
   * Select specific fields to fetch from the WatchSymbols
  **/
  select?: WatchSymbolsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: WatchSymbolsInclude | null
}



/**
 * Model sms
 */

export type sms = {
  id: number
  msg: string
  phone: string
  createdAt: Date
  sent: boolean
  status: string
  onceDaily: string
}


export type AggregateSms = {
  count: number
  avg: SmsAvgAggregateOutputType | null
  sum: SmsSumAggregateOutputType | null
  min: SmsMinAggregateOutputType | null
  max: SmsMaxAggregateOutputType | null
}

export type SmsAvgAggregateOutputType = {
  id: number
}

export type SmsSumAggregateOutputType = {
  id: number
}

export type SmsMinAggregateOutputType = {
  id: number
}

export type SmsMaxAggregateOutputType = {
  id: number
}


export type SmsAvgAggregateInputType = {
  id?: true
}

export type SmsSumAggregateInputType = {
  id?: true
}

export type SmsMinAggregateInputType = {
  id?: true
}

export type SmsMaxAggregateInputType = {
  id?: true
}

export type AggregateSmsArgs = {
  where?: smsWhereInput
  orderBy?: Enumerable<smsOrderByInput> | smsOrderByInput
  cursor?: smsWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<SmsDistinctFieldEnum>
  count?: true
  avg?: SmsAvgAggregateInputType
  sum?: SmsSumAggregateInputType
  min?: SmsMinAggregateInputType
  max?: SmsMaxAggregateInputType
}

export type GetSmsAggregateType<T extends AggregateSmsArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetSmsAggregateScalarType<T[P]>
}

export type GetSmsAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof SmsAvgAggregateOutputType ? SmsAvgAggregateOutputType[P] : never
}
    
    

export type smsSelect = {
  id?: boolean
  msg?: boolean
  phone?: boolean
  createdAt?: boolean
  sent?: boolean
  status?: boolean
  onceDaily?: boolean
}

export type smsGetPayload<
  S extends boolean | null | undefined | smsArgs,
  U = keyof S
> = S extends true
  ? sms
  : S extends undefined
  ? never
  : S extends smsArgs | FindManysmsArgs
  ? 'include' extends U
    ? sms 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof sms ? sms[P]
: 
 never
    }
  : sms
: sms


export interface smsDelegate {
  /**
   * Find zero or one Sms that matches the filter.
   * @param {FindOnesmsArgs} args - Arguments to find a Sms
   * @example
   * // Get one Sms
   * const sms = await prisma.sms.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnesmsArgs>(
    args: Subset<T, FindOnesmsArgs>
  ): CheckSelect<T, Prisma__smsClient<sms | null>, Prisma__smsClient<smsGetPayload<T> | null>>
  /**
   * Find the first Sms that matches the filter.
   * @param {FindFirstsmsArgs} args - Arguments to find a Sms
   * @example
   * // Get one Sms
   * const sms = await prisma.sms.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstsmsArgs>(
    args: Subset<T, FindFirstsmsArgs>
  ): CheckSelect<T, Prisma__smsClient<sms>, Prisma__smsClient<smsGetPayload<T>>>
  /**
   * Find zero or more Sms that matches the filter.
   * @param {FindManysmsArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Sms
   * const sms = await prisma.sms.findMany()
   * 
   * // Get first 10 Sms
   * const sms = await prisma.sms.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const smsWithIdOnly = await prisma.sms.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManysmsArgs>(
    args?: Subset<T, FindManysmsArgs>
  ): CheckSelect<T, Promise<Array<sms>>, Promise<Array<smsGetPayload<T>>>>
  /**
   * Create a Sms.
   * @param {smsCreateArgs} args - Arguments to create a Sms.
   * @example
   * // Create one Sms
   * const Sms = await prisma.sms.create({
   *   data: {
   *     // ... data to create a Sms
   *   }
   * })
   * 
  **/
  create<T extends smsCreateArgs>(
    args: Subset<T, smsCreateArgs>
  ): CheckSelect<T, Prisma__smsClient<sms>, Prisma__smsClient<smsGetPayload<T>>>
  /**
   * Delete a Sms.
   * @param {smsDeleteArgs} args - Arguments to delete one Sms.
   * @example
   * // Delete one Sms
   * const Sms = await prisma.sms.delete({
   *   where: {
   *     // ... filter to delete one Sms
   *   }
   * })
   * 
  **/
  delete<T extends smsDeleteArgs>(
    args: Subset<T, smsDeleteArgs>
  ): CheckSelect<T, Prisma__smsClient<sms>, Prisma__smsClient<smsGetPayload<T>>>
  /**
   * Update one Sms.
   * @param {smsUpdateArgs} args - Arguments to update one Sms.
   * @example
   * // Update one Sms
   * const sms = await prisma.sms.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends smsUpdateArgs>(
    args: Subset<T, smsUpdateArgs>
  ): CheckSelect<T, Prisma__smsClient<sms>, Prisma__smsClient<smsGetPayload<T>>>
  /**
   * Delete zero or more Sms.
   * @param {smsDeleteManyArgs} args - Arguments to filter Sms to delete.
   * @example
   * // Delete a few Sms
   * const { count } = await prisma.sms.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends smsDeleteManyArgs>(
    args: Subset<T, smsDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Sms.
   * @param {smsUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Sms
   * const sms = await prisma.sms.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends smsUpdateManyArgs>(
    args: Subset<T, smsUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Sms.
   * @param {smsUpsertArgs} args - Arguments to update or create a Sms.
   * @example
   * // Update or create a Sms
   * const sms = await prisma.sms.upsert({
   *   create: {
   *     // ... data to create a Sms
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Sms we want to update
   *   }
   * })
  **/
  upsert<T extends smsUpsertArgs>(
    args: Subset<T, smsUpsertArgs>
  ): CheckSelect<T, Prisma__smsClient<sms>, Prisma__smsClient<smsGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManysmsArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateSmsArgs>(args: Subset<T, AggregateSmsArgs>): Promise<GetSmsAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for sms.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__smsClient<T> implements Promise<T> {
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
 * sms findOne
 */
export type FindOnesmsArgs = {
  /**
   * Select specific fields to fetch from the sms
  **/
  select?: smsSelect | null
  /**
   * Filter, which sms to fetch.
  **/
  where: smsWhereUniqueInput
}


/**
 * sms findFirst
 */
export type FindFirstsmsArgs = {
  /**
   * Select specific fields to fetch from the sms
  **/
  select?: smsSelect | null
  /**
   * Filter, which sms to fetch.
  **/
  where?: smsWhereInput
  orderBy?: Enumerable<smsOrderByInput> | smsOrderByInput
  cursor?: smsWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<SmsDistinctFieldEnum>
}


/**
 * sms findMany
 */
export type FindManysmsArgs = {
  /**
   * Select specific fields to fetch from the sms
  **/
  select?: smsSelect | null
  /**
   * Filter, which sms to fetch.
  **/
  where?: smsWhereInput
  /**
   * Determine the order of the sms to fetch.
  **/
  orderBy?: Enumerable<smsOrderByInput> | smsOrderByInput
  /**
   * Sets the position for listing sms.
  **/
  cursor?: smsWhereUniqueInput
  /**
   * The number of sms to fetch. If negative number, it will take sms before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` sms.
  **/
  skip?: number
  distinct?: Enumerable<SmsDistinctFieldEnum>
}


/**
 * sms create
 */
export type smsCreateArgs = {
  /**
   * Select specific fields to fetch from the sms
  **/
  select?: smsSelect | null
  /**
   * The data needed to create a sms.
  **/
  data: smsCreateInput
}


/**
 * sms update
 */
export type smsUpdateArgs = {
  /**
   * Select specific fields to fetch from the sms
  **/
  select?: smsSelect | null
  /**
   * The data needed to update a sms.
  **/
  data: smsUpdateInput
  /**
   * Choose, which sms to update.
  **/
  where: smsWhereUniqueInput
}


/**
 * sms updateMany
 */
export type smsUpdateManyArgs = {
  data: smsUpdateManyMutationInput
  where?: smsWhereInput
}


/**
 * sms upsert
 */
export type smsUpsertArgs = {
  /**
   * Select specific fields to fetch from the sms
  **/
  select?: smsSelect | null
  /**
   * The filter to search for the sms to update in case it exists.
  **/
  where: smsWhereUniqueInput
  /**
   * In case the sms found by the `where` argument doesn't exist, create a new sms with this data.
  **/
  create: smsCreateInput
  /**
   * In case the sms was found with the provided `where` argument, update it with this data.
  **/
  update: smsUpdateInput
}


/**
 * sms delete
 */
export type smsDeleteArgs = {
  /**
   * Select specific fields to fetch from the sms
  **/
  select?: smsSelect | null
  /**
   * Filter which sms to delete.
  **/
  where: smsWhereUniqueInput
}


/**
 * sms deleteMany
 */
export type smsDeleteManyArgs = {
  where?: smsWhereInput
}


/**
 * sms without action
 */
export type smsArgs = {
  /**
   * Select specific fields to fetch from the sms
  **/
  select?: smsSelect | null
}



/**
 * Deep Input Types
 */


export type LessonWhereInput = {
  AND?: LessonWhereInput | Enumerable<LessonWhereInput>
  OR?: LessonWhereInput | Enumerable<LessonWhereInput>
  NOT?: LessonWhereInput | Enumerable<LessonWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  description?: StringFilter | string
  postedById?: IntNullableFilter | number | null
  postedBy?: UserRelationFilter | UserWhereInput | null
  multimedia?: MultimediaListRelationFilter
}

export type LessonOrderByInput = {
  id?: SortOrder
  createdAt?: SortOrder
  description?: SortOrder
  postedById?: SortOrder
}

export type LessonWhereUniqueInput = {
  id?: number
}

export type MultimediaWhereInput = {
  AND?: MultimediaWhereInput | Enumerable<MultimediaWhereInput>
  OR?: MultimediaWhereInput | Enumerable<MultimediaWhereInput>
  NOT?: MultimediaWhereInput | Enumerable<MultimediaWhereInput>
  id?: IntFilter | number
  url?: StringFilter | string
  createdAt?: DateTimeFilter | Date | string
  lesson?: LessonRelationFilter | LessonWhereInput | null
  lessonId?: IntNullableFilter | number | null
}

export type MultimediaOrderByInput = {
  id?: SortOrder
  url?: SortOrder
  createdAt?: SortOrder
  lessonId?: SortOrder
}

export type MultimediaWhereUniqueInput = {
  id?: number
}

export type UserWhereInput = {
  AND?: UserWhereInput | Enumerable<UserWhereInput>
  OR?: UserWhereInput | Enumerable<UserWhereInput>
  NOT?: UserWhereInput | Enumerable<UserWhereInput>
  id?: IntFilter | number
  name?: StringFilter | string
  email?: StringFilter | string
  password?: StringFilter | string
  lessons?: LessonListRelationFilter
  watchSymbols?: WatchSymbolsListRelationFilter
}

export type UserOrderByInput = {
  id?: SortOrder
  name?: SortOrder
  email?: SortOrder
  password?: SortOrder
}

export type UserWhereUniqueInput = {
  id?: number
  email?: string
}

export type WatchSymbolsWhereInput = {
  AND?: WatchSymbolsWhereInput | Enumerable<WatchSymbolsWhereInput>
  OR?: WatchSymbolsWhereInput | Enumerable<WatchSymbolsWhereInput>
  NOT?: WatchSymbolsWhereInput | Enumerable<WatchSymbolsWhereInput>
  id?: IntFilter | number
  symbol?: StringFilter | string
  minAmount?: StringFilter | string
  maxAmount?: StringFilter | string
  phone?: StringFilter | string
  createdAt?: DateTimeFilter | Date | string
  postedById?: IntNullableFilter | number | null
  postedBy?: UserRelationFilter | UserWhereInput | null
}

export type WatchSymbolsOrderByInput = {
  id?: SortOrder
  symbol?: SortOrder
  minAmount?: SortOrder
  maxAmount?: SortOrder
  phone?: SortOrder
  createdAt?: SortOrder
  postedById?: SortOrder
}

export type WatchSymbolsWhereUniqueInput = {
  id?: number
}

export type smsWhereInput = {
  AND?: smsWhereInput | Enumerable<smsWhereInput>
  OR?: smsWhereInput | Enumerable<smsWhereInput>
  NOT?: smsWhereInput | Enumerable<smsWhereInput>
  id?: IntFilter | number
  msg?: StringFilter | string
  phone?: StringFilter | string
  createdAt?: DateTimeFilter | Date | string
  sent?: BoolFilter | boolean
  status?: StringFilter | string
  onceDaily?: StringFilter | string
}

export type smsOrderByInput = {
  id?: SortOrder
  msg?: SortOrder
  phone?: SortOrder
  createdAt?: SortOrder
  sent?: SortOrder
  status?: SortOrder
  onceDaily?: SortOrder
}

export type smsWhereUniqueInput = {
  id?: number
  onceDaily?: string
}

export type LessonCreateInput = {
  createdAt?: Date | string
  description: string
  postedBy?: UserCreateOneWithoutLessonsInput
  multimedia?: MultimediaCreateManyWithoutLessonInput
}

export type LessonUpdateInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
  postedBy?: UserUpdateOneWithoutLessonsInput
  multimedia?: MultimediaUpdateManyWithoutLessonInput
}

export type LessonUpdateManyMutationInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
}

export type MultimediaCreateInput = {
  url: string
  createdAt?: Date | string
  lesson?: LessonCreateOneWithoutMultimediaInput
}

export type MultimediaUpdateInput = {
  url?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  lesson?: LessonUpdateOneWithoutMultimediaInput
}

export type MultimediaUpdateManyMutationInput = {
  url?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type UserCreateInput = {
  name: string
  email: string
  password: string
  lessons?: LessonCreateManyWithoutPostedByInput
  watchSymbols?: WatchSymbolsCreateManyWithoutPostedByInput
}

export type UserUpdateInput = {
  name?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
  lessons?: LessonUpdateManyWithoutPostedByInput
  watchSymbols?: WatchSymbolsUpdateManyWithoutPostedByInput
}

export type UserUpdateManyMutationInput = {
  name?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
}

export type WatchSymbolsCreateInput = {
  symbol: string
  minAmount?: string
  maxAmount?: string
  phone?: string
  createdAt?: Date | string
  postedBy?: UserCreateOneWithoutWatchSymbolsInput
}

export type WatchSymbolsUpdateInput = {
  symbol?: string | StringFieldUpdateOperationsInput
  minAmount?: string | StringFieldUpdateOperationsInput
  maxAmount?: string | StringFieldUpdateOperationsInput
  phone?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  postedBy?: UserUpdateOneWithoutWatchSymbolsInput
}

export type WatchSymbolsUpdateManyMutationInput = {
  symbol?: string | StringFieldUpdateOperationsInput
  minAmount?: string | StringFieldUpdateOperationsInput
  maxAmount?: string | StringFieldUpdateOperationsInput
  phone?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type smsCreateInput = {
  msg?: string
  phone?: string
  createdAt?: Date | string
  sent?: boolean
  status?: string
  onceDaily: string
}

export type smsUpdateInput = {
  msg?: string | StringFieldUpdateOperationsInput
  phone?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  sent?: boolean | BoolFieldUpdateOperationsInput
  status?: string | StringFieldUpdateOperationsInput
  onceDaily?: string | StringFieldUpdateOperationsInput
}

export type smsUpdateManyMutationInput = {
  msg?: string | StringFieldUpdateOperationsInput
  phone?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  sent?: boolean | BoolFieldUpdateOperationsInput
  status?: string | StringFieldUpdateOperationsInput
  onceDaily?: string | StringFieldUpdateOperationsInput
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

export type IntNullableFilter = {
  equals?: number | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntNullableFilter | null
}

export type UserRelationFilter = {
  is?: UserWhereInput | null
  isNot?: UserWhereInput | null
}

export type MultimediaListRelationFilter = {
  every?: MultimediaWhereInput
  some?: MultimediaWhereInput
  none?: MultimediaWhereInput
}

export type LessonRelationFilter = {
  is?: LessonWhereInput | null
  isNot?: LessonWhereInput | null
}

export type LessonListRelationFilter = {
  every?: LessonWhereInput
  some?: LessonWhereInput
  none?: LessonWhereInput
}

export type WatchSymbolsListRelationFilter = {
  every?: WatchSymbolsWhereInput
  some?: WatchSymbolsWhereInput
  none?: WatchSymbolsWhereInput
}

export type BoolFilter = {
  equals?: boolean
  not?: boolean | NestedBoolFilter
}

export type UserCreateOneWithoutLessonsInput = {
  create?: UserCreateWithoutLessonsInput
  connect?: UserWhereUniqueInput
}

export type MultimediaCreateManyWithoutLessonInput = {
  create?: MultimediaCreateWithoutLessonInput | Enumerable<MultimediaCreateWithoutLessonInput>
  connect?: MultimediaWhereUniqueInput | Enumerable<MultimediaWhereUniqueInput>
}

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type UserUpdateOneWithoutLessonsInput = {
  create?: UserCreateWithoutLessonsInput
  connect?: UserWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: UserUpdateWithoutLessonsDataInput
  upsert?: UserUpsertWithoutLessonsInput
}

export type MultimediaUpdateManyWithoutLessonInput = {
  create?: MultimediaCreateWithoutLessonInput | Enumerable<MultimediaCreateWithoutLessonInput>
  connect?: MultimediaWhereUniqueInput | Enumerable<MultimediaWhereUniqueInput>
  set?: MultimediaWhereUniqueInput | Enumerable<MultimediaWhereUniqueInput>
  disconnect?: MultimediaWhereUniqueInput | Enumerable<MultimediaWhereUniqueInput>
  delete?: MultimediaWhereUniqueInput | Enumerable<MultimediaWhereUniqueInput>
  update?: MultimediaUpdateWithWhereUniqueWithoutLessonInput | Enumerable<MultimediaUpdateWithWhereUniqueWithoutLessonInput>
  updateMany?: MultimediaUpdateManyWithWhereNestedInput | Enumerable<MultimediaUpdateManyWithWhereNestedInput>
  deleteMany?: MultimediaScalarWhereInput | Enumerable<MultimediaScalarWhereInput>
  upsert?: MultimediaUpsertWithWhereUniqueWithoutLessonInput | Enumerable<MultimediaUpsertWithWhereUniqueWithoutLessonInput>
}

export type LessonCreateOneWithoutMultimediaInput = {
  create?: LessonCreateWithoutMultimediaInput
  connect?: LessonWhereUniqueInput
}

export type LessonUpdateOneWithoutMultimediaInput = {
  create?: LessonCreateWithoutMultimediaInput
  connect?: LessonWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: LessonUpdateWithoutMultimediaDataInput
  upsert?: LessonUpsertWithoutMultimediaInput
}

export type LessonCreateManyWithoutPostedByInput = {
  create?: LessonCreateWithoutPostedByInput | Enumerable<LessonCreateWithoutPostedByInput>
  connect?: LessonWhereUniqueInput | Enumerable<LessonWhereUniqueInput>
}

export type WatchSymbolsCreateManyWithoutPostedByInput = {
  create?: WatchSymbolsCreateWithoutPostedByInput | Enumerable<WatchSymbolsCreateWithoutPostedByInput>
  connect?: WatchSymbolsWhereUniqueInput | Enumerable<WatchSymbolsWhereUniqueInput>
}

export type LessonUpdateManyWithoutPostedByInput = {
  create?: LessonCreateWithoutPostedByInput | Enumerable<LessonCreateWithoutPostedByInput>
  connect?: LessonWhereUniqueInput | Enumerable<LessonWhereUniqueInput>
  set?: LessonWhereUniqueInput | Enumerable<LessonWhereUniqueInput>
  disconnect?: LessonWhereUniqueInput | Enumerable<LessonWhereUniqueInput>
  delete?: LessonWhereUniqueInput | Enumerable<LessonWhereUniqueInput>
  update?: LessonUpdateWithWhereUniqueWithoutPostedByInput | Enumerable<LessonUpdateWithWhereUniqueWithoutPostedByInput>
  updateMany?: LessonUpdateManyWithWhereNestedInput | Enumerable<LessonUpdateManyWithWhereNestedInput>
  deleteMany?: LessonScalarWhereInput | Enumerable<LessonScalarWhereInput>
  upsert?: LessonUpsertWithWhereUniqueWithoutPostedByInput | Enumerable<LessonUpsertWithWhereUniqueWithoutPostedByInput>
}

export type WatchSymbolsUpdateManyWithoutPostedByInput = {
  create?: WatchSymbolsCreateWithoutPostedByInput | Enumerable<WatchSymbolsCreateWithoutPostedByInput>
  connect?: WatchSymbolsWhereUniqueInput | Enumerable<WatchSymbolsWhereUniqueInput>
  set?: WatchSymbolsWhereUniqueInput | Enumerable<WatchSymbolsWhereUniqueInput>
  disconnect?: WatchSymbolsWhereUniqueInput | Enumerable<WatchSymbolsWhereUniqueInput>
  delete?: WatchSymbolsWhereUniqueInput | Enumerable<WatchSymbolsWhereUniqueInput>
  update?: WatchSymbolsUpdateWithWhereUniqueWithoutPostedByInput | Enumerable<WatchSymbolsUpdateWithWhereUniqueWithoutPostedByInput>
  updateMany?: WatchSymbolsUpdateManyWithWhereNestedInput | Enumerable<WatchSymbolsUpdateManyWithWhereNestedInput>
  deleteMany?: WatchSymbolsScalarWhereInput | Enumerable<WatchSymbolsScalarWhereInput>
  upsert?: WatchSymbolsUpsertWithWhereUniqueWithoutPostedByInput | Enumerable<WatchSymbolsUpsertWithWhereUniqueWithoutPostedByInput>
}

export type UserCreateOneWithoutWatchSymbolsInput = {
  create?: UserCreateWithoutWatchSymbolsInput
  connect?: UserWhereUniqueInput
}

export type UserUpdateOneWithoutWatchSymbolsInput = {
  create?: UserCreateWithoutWatchSymbolsInput
  connect?: UserWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: UserUpdateWithoutWatchSymbolsDataInput
  upsert?: UserUpsertWithoutWatchSymbolsInput
}

export type BoolFieldUpdateOperationsInput = {
  set?: boolean
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

export type NestedIntNullableFilter = {
  equals?: number | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntNullableFilter | null
}

export type NestedBoolFilter = {
  equals?: boolean
  not?: boolean | NestedBoolFilter
}

export type UserCreateWithoutLessonsInput = {
  name: string
  email: string
  password: string
  watchSymbols?: WatchSymbolsCreateManyWithoutPostedByInput
}

export type MultimediaCreateWithoutLessonInput = {
  url: string
  createdAt?: Date | string
}

export type UserUpdateWithoutLessonsDataInput = {
  name?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
  watchSymbols?: WatchSymbolsUpdateManyWithoutPostedByInput
}

export type UserUpsertWithoutLessonsInput = {
  update: UserUpdateWithoutLessonsDataInput
  create: UserCreateWithoutLessonsInput
}

export type MultimediaUpdateWithWhereUniqueWithoutLessonInput = {
  where: MultimediaWhereUniqueInput
  data: MultimediaUpdateWithoutLessonDataInput
}

export type MultimediaUpdateManyWithWhereNestedInput = {
  where: MultimediaScalarWhereInput
  data: MultimediaUpdateManyDataInput
}

export type MultimediaScalarWhereInput = {
  AND?: MultimediaScalarWhereInput | Enumerable<MultimediaScalarWhereInput>
  OR?: MultimediaScalarWhereInput | Enumerable<MultimediaScalarWhereInput>
  NOT?: MultimediaScalarWhereInput | Enumerable<MultimediaScalarWhereInput>
  id?: IntFilter | number
  url?: StringFilter | string
  createdAt?: DateTimeFilter | Date | string
  lessonId?: IntNullableFilter | number | null
}

export type MultimediaUpsertWithWhereUniqueWithoutLessonInput = {
  where: MultimediaWhereUniqueInput
  update: MultimediaUpdateWithoutLessonDataInput
  create: MultimediaCreateWithoutLessonInput
}

export type LessonCreateWithoutMultimediaInput = {
  createdAt?: Date | string
  description: string
  postedBy?: UserCreateOneWithoutLessonsInput
}

export type LessonUpdateWithoutMultimediaDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
  postedBy?: UserUpdateOneWithoutLessonsInput
}

export type LessonUpsertWithoutMultimediaInput = {
  update: LessonUpdateWithoutMultimediaDataInput
  create: LessonCreateWithoutMultimediaInput
}

export type LessonCreateWithoutPostedByInput = {
  createdAt?: Date | string
  description: string
  multimedia?: MultimediaCreateManyWithoutLessonInput
}

export type WatchSymbolsCreateWithoutPostedByInput = {
  symbol: string
  minAmount?: string
  maxAmount?: string
  phone?: string
  createdAt?: Date | string
}

export type LessonUpdateWithWhereUniqueWithoutPostedByInput = {
  where: LessonWhereUniqueInput
  data: LessonUpdateWithoutPostedByDataInput
}

export type LessonUpdateManyWithWhereNestedInput = {
  where: LessonScalarWhereInput
  data: LessonUpdateManyDataInput
}

export type LessonScalarWhereInput = {
  AND?: LessonScalarWhereInput | Enumerable<LessonScalarWhereInput>
  OR?: LessonScalarWhereInput | Enumerable<LessonScalarWhereInput>
  NOT?: LessonScalarWhereInput | Enumerable<LessonScalarWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  description?: StringFilter | string
  postedById?: IntNullableFilter | number | null
}

export type LessonUpsertWithWhereUniqueWithoutPostedByInput = {
  where: LessonWhereUniqueInput
  update: LessonUpdateWithoutPostedByDataInput
  create: LessonCreateWithoutPostedByInput
}

export type WatchSymbolsUpdateWithWhereUniqueWithoutPostedByInput = {
  where: WatchSymbolsWhereUniqueInput
  data: WatchSymbolsUpdateWithoutPostedByDataInput
}

export type WatchSymbolsUpdateManyWithWhereNestedInput = {
  where: WatchSymbolsScalarWhereInput
  data: WatchSymbolsUpdateManyDataInput
}

export type WatchSymbolsScalarWhereInput = {
  AND?: WatchSymbolsScalarWhereInput | Enumerable<WatchSymbolsScalarWhereInput>
  OR?: WatchSymbolsScalarWhereInput | Enumerable<WatchSymbolsScalarWhereInput>
  NOT?: WatchSymbolsScalarWhereInput | Enumerable<WatchSymbolsScalarWhereInput>
  id?: IntFilter | number
  symbol?: StringFilter | string
  minAmount?: StringFilter | string
  maxAmount?: StringFilter | string
  phone?: StringFilter | string
  createdAt?: DateTimeFilter | Date | string
  postedById?: IntNullableFilter | number | null
}

export type WatchSymbolsUpsertWithWhereUniqueWithoutPostedByInput = {
  where: WatchSymbolsWhereUniqueInput
  update: WatchSymbolsUpdateWithoutPostedByDataInput
  create: WatchSymbolsCreateWithoutPostedByInput
}

export type UserCreateWithoutWatchSymbolsInput = {
  name: string
  email: string
  password: string
  lessons?: LessonCreateManyWithoutPostedByInput
}

export type UserUpdateWithoutWatchSymbolsDataInput = {
  name?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
  lessons?: LessonUpdateManyWithoutPostedByInput
}

export type UserUpsertWithoutWatchSymbolsInput = {
  update: UserUpdateWithoutWatchSymbolsDataInput
  create: UserCreateWithoutWatchSymbolsInput
}

export type MultimediaUpdateWithoutLessonDataInput = {
  url?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type MultimediaUpdateManyDataInput = {
  url?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type LessonUpdateWithoutPostedByDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
  multimedia?: MultimediaUpdateManyWithoutLessonInput
}

export type LessonUpdateManyDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
}

export type WatchSymbolsUpdateWithoutPostedByDataInput = {
  symbol?: string | StringFieldUpdateOperationsInput
  minAmount?: string | StringFieldUpdateOperationsInput
  maxAmount?: string | StringFieldUpdateOperationsInput
  phone?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type WatchSymbolsUpdateManyDataInput = {
  symbol?: string | StringFieldUpdateOperationsInput
  minAmount?: string | StringFieldUpdateOperationsInput
  maxAmount?: string | StringFieldUpdateOperationsInput
  phone?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
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
