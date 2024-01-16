type ApiError = {
  field: string;
  message: string;
};
class ApiResult {
  constructor(public isSuccess: boolean, public errors: string[] | any) {}

  public static SuccessfulResult(): ApiResult {
    return new ApiResult(true, []);
  }

  public static FailedResult(errors: string[]): ApiResult {
    return new ApiResult(false, errors);
  }
}

class ApiResultWithData<TData> {
  constructor(
    public isSuccess: boolean,
    public errors: string[] | any,
    public data: TData | undefined = undefined
  ) {}

  public static SuccessfulResult<TData>(data: TData): ApiResultWithData<TData> {
    return new ApiResultWithData<TData>(true, [], data);
  }

  public static FailedResult<TData>(
    errors: string[]
  ): ApiResultWithData<TData> {
    return new ApiResultWithData<TData>(false, errors);
  }
}

export { ApiResult, ApiResultWithData };
