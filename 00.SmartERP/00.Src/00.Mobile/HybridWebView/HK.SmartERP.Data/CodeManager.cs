using HK.SmartERP.LIB.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HK.SmartERP.Data
{
    public static class CodeManager
    {
        /// <summary>
        /// DB에서 코드 1, 2, 3 단계와 코드설명 리스트를 조회한다.
        /// </summary>
        /// <returns>성공여부</returns>
        public static bool Load(string dbname)
        {
            GetList(dbname);

            return true;
            //if (!GetList())
            //    return false;

            //return true;
        }

        public static void SetList(List<DMS_CodeResponse> list)
        {
            if (Code_List == null || Code_List.Count <= 0)
            {
                Code_List = list;
            }
        }

        public enum CodeReturnType
        {
            비어있음, 성공, 실패, 중복, 데이터비어있음, 하위데이터있음
        }

        private static List<DMS_CodeResponse> Code_List { set; get; }

        #region 00. 코드 관련 처리

        private static void GetList(string dbname)
        {
            try
            {
                //var result = await Code.GetList(dbname);

                var result = 쿼리_코드.GetInstance().조회();

                Code_List = JsonTool.Deserialize<List<DMS_CodeResponse>>(result);

                //if (result != null)
                //    _code = result;

                //var codeData = new Code_GetListRequestData()
                //{ };

                //var result = DMS_코드쿼리.GetList(codeData);

                //if (result == null || result.success == false)
                //{
                //    Log.Error(new LogMsg { MethodName = "Code.GetList", Msg = "Service Failed." });
                //    return false;
                //}

                //Code_List = result;

                //return true;
            }
            catch (Exception ex)
            {
                //Log.Error(new LogMsg { MethodName = "Code", Msg = "Service Failed.", Exception = ex });
                //return false;
            }
        }

        private static void Add(DMS_CodeResponse data)
        {
            Code_List.Add(data);
        }

        private static void Modify(DMS_CodeResponse data)
        {
            var tempData = Code_List.Where(t => t.CODE == data.CODE && (string.IsNullOrEmpty(t.CODE_001) || t.CODE_001 == data.CODE_001) && (string.IsNullOrEmpty(t.CODE_002) || t.CODE_002 == data.CODE_002) && (string.IsNullOrEmpty(t.CODE_003) || t.CODE_003 == data.CODE_003)).SingleOrDefault();

            if (Code_List.Remove(tempData))
                Code_List.Add(data);
        }

        private static void Remove(DMS_CodeResponse data)
        {
            var tempData = Code_List.Where(t => t.CODE == data.CODE && (string.IsNullOrEmpty(t.CODE_001) || t.CODE_001 == data.CODE_001) && (string.IsNullOrEmpty(t.CODE_002) || t.CODE_002 == data.CODE_002) && (string.IsNullOrEmpty(t.CODE_003) || t.CODE_003 == data.CODE_003)).SingleOrDefault();

            Code_List.Remove(tempData);
        }

        #endregion

        #region 01. 검색조건에 적합한 코드 데이터를 조회한다. (리스트용)

        public static List<DMS_CodeResponse> GetList_1st(string codeID, string codeName, bool useYN)
        {
            try
            {
                if (Code_List == null || Code_List.Count < 1)
                    GetList(SettingManager.MYACCOUNT.ACCOUNT_DB_NAME);

                var data = Code_List.Where(t => t.CODE_USEYN == useYN &&
                                            (string.IsNullOrEmpty(codeID) || t.CODE == codeID) &&
                                            (string.IsNullOrEmpty(codeName) || t.CODE_NAME.Contains(codeName)) &&
                                            (t.CODE_002 == "---" || t.CODE_002 == "" || t.CODE_002 == null) &&
                                            (t.CODE_003 == "---" || t.CODE_003 == "" || t.CODE_003 == null))
                                    .OrderBy(t => t.CODE)
                                    .OrderBy(t => t.CODE_SORT).ToList();

                return data;
            }
            catch
            { return null; }
        }

        public static List<DMS_CodeResponse> GetList_2nd(string CD1, bool useYN)
        {
            try
            {
                return Code_List.Where(t => t.CODE_USEYN == useYN &&
                                            (t.CODE_001 == CD1) &&
                                            (t.CODE_002 != "---" && t.CODE_002 != "" && t.CODE_002 != null) &&
                                            (t.CODE_003 == "---" || t.CODE_003 == "" || t.CODE_003 == null))
                                    .OrderBy(t => t.CODE)
                                    .OrderBy(t => t.CODE_SORT).ToList();
            }
            catch
            { return null; }
        }

        public static List<DMS_CodeResponse> GetList_3rd(string CD1, string CD2, bool useYN)
        {
            try
            {
                return Code_List.Where(t => t.CODE_USEYN == useYN &&
                                            (t.CODE_001 == CD1) && (t.CODE_002 == CD2) &&
                                            (t.CODE_003 != "---" && t.CODE_003 != "" && t.CODE_003 != null))
                                    .OrderBy(t => t.CODE)
                                    .OrderBy(t => t.CODE_SORT).ToList();
            }
            catch
            { return null; }
        }

        public static List<DMS_CodeResponse> GetAllList_1st(string codeID, string codeName)
        {
            try
            {
                if (Code_List == null || Code_List.Count < 1)
                    GetList(SettingManager.MYACCOUNT.ACCOUNT_DB_NAME);

                var data = Code_List.Where(t =>
                                            (string.IsNullOrEmpty(codeID) || t.CODE == codeID) &&
                                            (string.IsNullOrEmpty(codeName) || t.CODE_NAME.Contains(codeName)) &&
                                            (t.CODE_002 == "---" || t.CODE_002 == "" || t.CODE_002 == null) &&
                                            (t.CODE_003 == "---" || t.CODE_003 == "" || t.CODE_003 == null))
                                    .OrderBy(t => t.CODE)
                                    .OrderBy(t => t.CODE_SORT).ToList();

                return data;
            }
            catch
            { return null; }
        }

        public static List<DMS_CodeResponse> GetAllList_2nd(string CD1)
        {
            try
            {
                return Code_List.Where(t =>
                                            (t.CODE_001 == CD1) &&
                                            (t.CODE_002 != "---" && t.CODE_002 != "" && t.CODE_002 != null) &&
                                            (t.CODE_003 == "---" || t.CODE_003 == "" || t.CODE_003 == null))
                                    .OrderBy(t => t.CODE)
                                    .OrderBy(t => t.CODE_SORT).ToList();
            }
            catch (Exception ex)
            { return null; }
        }

        public static List<DMS_CodeResponse> GetAllList_3rd(string CD1, string CD2)
        {
            try
            {
                return Code_List.Where(t =>
                                            (t.CODE_001 == CD1) && (t.CODE_002 == CD2) &&
                                            (t.CODE_003 != "---" && t.CODE_003 != "" && t.CODE_003 != null))
                                    .OrderBy(t => t.CODE)
                                    .OrderBy(t => t.CODE_SORT).ToList();
            }
            catch
            { return null; }
        }

        #endregion

        #region 02. 콤보박스용

        public static List<DMS_CodeResponse> GetCombo_1st(bool addEmptyRow = true)
        {
            try
            {
                var tempList = Code_List.Where(t => t.CODE_USEYN == true &&
                                                      (t.CODE_002 == "---" || t.CODE_002 == "" || t.CODE_002 == null) &&
                                                      (t.CODE_003 == "---" || t.CODE_003 == "" || t.CODE_003 == null))
                                             .OrderBy(t => t.CODE_SORT).ToList();

                if (addEmptyRow)
                    tempList.Insert(0, new DMS_CodeResponse() { CODE = string.Empty, CODE_NAME = "전체" });

                return tempList;
            }
            catch
            { return null; }
        }

        public static List<DMS_CodeResponse> GetCombo_2nd(string CD1, bool addEmptyRow = true)
        {
            try
            {
                var tempList = Code_List.Where(t => t.CODE_USEYN == true &&
                                                      t.CODE_001 == CD1 &&
                                                      (t.CODE_002 != "---" && t.CODE_002 != "" && t.CODE_002 != null) &&
                                                      (t.CODE_003 == "---" || t.CODE_003 == "" || t.CODE_003 == null))
                                             .OrderBy(t => t.CODE_SORT).ToList();

                if (addEmptyRow)
                    tempList.Insert(0, new DMS_CodeResponse() { CODE = string.Empty, CODE_NAME = "전체" });

                return tempList;
            }
            catch
            { return null; }
        }

        public static List<DMS_CodeResponse> GetCombo_3rd(string CD1, string CD2, bool addEmptyRow = true)
        {
            try
            {
                var tempList = Code_List.Where(t => t.CODE_USEYN == true &&
                                                      t.CODE_001 == CD1 &&
                                                      t.CODE_002 == CD2 &&
                                                      (t.CODE_003 != "---" && t.CODE_003 != "" && t.CODE_003 != null))
                                             .OrderBy(t => t.CODE_SORT).ToList();

                if (addEmptyRow)
                    tempList.Insert(0, new DMS_CodeResponse() { CODE = string.Empty, CODE_NAME = "전체" });

                return tempList;
            }
            catch
            { return null; }
        }

        #endregion

        #region 03. 코드데이터 - 저장
        public static CodeReturnType Create_1st(DMS_CodeResponse data)
        {
            if (data == null || string.IsNullOrEmpty(data.CODE_001))
                return CodeReturnType.비어있음;

            try
            {
                var check = IsExitst_1st(data.CODE_001);

                if (check == null)
                    return CodeReturnType.실패;
                else if (check == true)
                    return CodeReturnType.중복;
                else
                {
                    var codeData = new Code001_InsertRequestData()
                    {
                        DB_NAME = SettingManager.MYACCOUNT.ACCOUNT_DB_NAME,

                        CODE_001 = data.CODE_001,
                        CODE_NAME = data.CODE_NAME,
                        CODE_TYPE = string.Empty,
                        CODE_DESC = data.CODE_DESC,
                        CODE_SORT = 0,
                        CODE_USEYN = data.CODE_USEYN,
                        CODE_UPDATE_SN = 1,
                        CODE_UPDATE_DATE = DateTime.Now.ToString("yyyyMMddHHmmss")
                    };

                    //var client = new CodeServiceClient(SettingManager.ServerAddress);
                    //Task.Run(async () => await Code.Create(codeData)).Wait();
                    쿼리_코드.GetInstance().등록(codeData);

                    //DMS_코드쿼리.Insert(codeData);

                    //if (!result)
                    //{
                    //    Log.Error(new LogMsg { MethodName = "Code.Insert", Msg = "Service Failed." });
                    //    return CodeReturnType.실패;
                    //}
                    //else
                    //{
                    //    data.CODE_002 = "---";
                    //    data.CODE_003 = "---";
                    //    Add(data);
                    //    return CodeReturnType.성공;
                    //}


                    data.CODE_002 = "---";
                    data.CODE_003 = "---";
                    Add(data);
                    return CodeReturnType.성공;
                }
            }
            catch (Exception ex)
            {
                return CodeReturnType.실패;
            }
        }

        public static CodeReturnType Create_2nd(DMS_CodeResponse data)
        {
            if (data == null || string.IsNullOrEmpty(data.CODE_001) || string.IsNullOrEmpty(data.CODE_002))
                return CodeReturnType.비어있음;

            try
            {
                var check = IsExitst_2nd(data.CODE_001, data.CODE_002);

                if (check == null)
                    return CodeReturnType.실패;
                else if (check == true)
                    return CodeReturnType.중복;
                else
                {
                    var codeData = new Code002_InsertRequestData()
                    {
                        DB_NAME = SettingManager.MYACCOUNT.ACCOUNT_DB_NAME,

                        CODE_001 = data.CODE_001,
                        CODE_002 = data.CODE,
                        CODE_NAME = data.CODE_NAME,
                        CODE_TYPE = string.Empty,
                        CODE_DESC = data.CODE_DESC,
                        CODE_SORT = data.CODE_SORT,
                        CODE_UPDATE_SN = 1,
                        CODE_UPDATE_DATE = DateTime.Now.ToString("yyyyMMddHHmmss"),
                        CODE_USEYN = data.CODE_USEYN
                    };

                    쿼리_코드.GetInstance().등록(codeData);

                    //var client = new CodeServiceClient(SettingManager.ServerAddress);
                    //var result = DMS_코드쿼리.Insert(codeData);

                    //if (result == null || !result.RESULT)
                    //{
                    //    Log.Error(new LogMsg { MethodName = "Code.Insert", Msg = "Service Failed." });
                    //    return CodeReturnType.실패;
                    //}
                    //else
                    //{
                    //    data.CODE_003 = "---";
                    //    Add(data);
                    //    return CodeReturnType.성공;
                    //}

                    data.CODE_003 = "---";
                    Add(data);
                    return CodeReturnType.성공;
                }
            }
            catch (Exception ex)
            {
                return CodeReturnType.실패;
            }
        }

        public static CodeReturnType Create_3rd(DMS_CodeResponse data)
        {
            if (data == null || string.IsNullOrEmpty(data.CODE_001) || string.IsNullOrEmpty(data.CODE_002) || string.IsNullOrEmpty(data.CODE_003))
                return CodeReturnType.비어있음;

            try
            {
                var check = IsExitst_3rd(data.CODE_001, data.CODE_002, data.CODE_003);

                if (check == null)
                    return CodeReturnType.실패;
                else if (check == true)
                    return CodeReturnType.중복;
                else
                {
                    var codeData = new Code003_InsertRequestData()
                    {
                        DB_NAME = SettingManager.MYACCOUNT.ACCOUNT_DB_NAME,

                        CODE_001 = data.CODE_001,
                        CODE_002 = data.CODE_002,
                        CODE_003 = data.CODE,
                        CODE_NAME = data.CODE_NAME,
                        CODE_TYPE = string.Empty,
                        CODE_DESC = data.CODE_DESC,
                        CODE_SORT = data.CODE_SORT,
                        CODE_UPDATE_SN = 1,
                        CODE_UPDATE_DATE = DateTime.Now.ToString("yyyyMMddHHmmss"),
                        CODE_USEYN = data.CODE_USEYN
                    };

                    쿼리_코드.GetInstance().등록(codeData);

                    //var client = new CodeServiceClient(SettingManager.ServerAddress);
                    //var result = DMS_코드쿼리.Insert(codeData);

                    //if (result == null || !result.RESULT)
                    //{
                    //    Log.Error(new LogMsg { MethodName = "Code.Insert", Msg = "Service Failed." });
                    //    return CodeReturnType.실패;
                    //}
                    //else
                    //{
                    //    Add(data);
                    //    return CodeReturnType.성공;
                    //}


                    Add(data);
                    return CodeReturnType.성공;
                }
            }
            catch (Exception ex)
            {
                return CodeReturnType.실패;
            }
        }
        #endregion

        #region 04. 코드데이터 - 수정

        public static CodeReturnType Update_1st(DMS_CodeResponse data)
        {
            if (data == null || string.IsNullOrEmpty(data.CODE_001))
                return CodeReturnType.비어있음;

            try
            {
                var check = IsExitst_1st(data.CODE_001);

                if (check == null)
                    return CodeReturnType.실패;
                else if (check == false)
                    return CodeReturnType.데이터비어있음;
                else
                {
                    var codeData = new Code001_UpdateRequestData()
                    {
                        DB_NAME = SettingManager.MYACCOUNT.ACCOUNT_DB_NAME,

                        CODE_001 = data.CODE_001,
                        CODE_NAME = data.CODE_NAME,
                        CODE_TYPE = string.Empty,
                        CODE_USEYN = data.CODE_USEYN,
                        CODE_SORT = data.CODE_SORT,
                        CODE_UPDATE_SN = 1,
                        CODE_UPDATE_DATE = DateTime.Now.ToString("yyyyMMddHHmmss"),
                        CODE_DESC = data.CODE_DESC
                    };

                    쿼리_코드.GetInstance().수정(codeData);

                    //var client = new CodeServiceClient(SettingManager.ServerAddress);
                    //var result = client.Code001_Update(codeData);
                    //var result = DMS_코드쿼리.Update(codeData);

                    //if (result == null || !result.RESULT)
                    //{
                    //    Log.Error(new LogMsg { MethodName = "Code.Update", Msg = "Service Failed." });
                    //    return CodeReturnType.실패;
                    //}
                    //else
                    //{
                    //    Modify(data);
                    //    return CodeReturnType.성공;
                    //}


                    Modify(data);
                    return CodeReturnType.성공;
                }
            }
            catch (Exception ex)
            {
                return CodeReturnType.실패;
            }
        }

        public static CodeReturnType Update_2nd(DMS_CodeResponse data)
        {
            if (data == null || string.IsNullOrEmpty(data.CODE_001) || string.IsNullOrEmpty(data.CODE_002))
                return CodeReturnType.비어있음;

            try
            {
                var check = IsExitst_2nd(data.CODE_001, data.CODE_002);

                if (check == null)
                    return CodeReturnType.실패;
                else if (check == false)
                    return CodeReturnType.데이터비어있음;
                else
                {
                    var codeData = new Code002_UpdateRequestData()
                    {
                        DB_NAME = SettingManager.MYACCOUNT.ACCOUNT_DB_NAME,

                        CODE_001 = data.CODE_001,
                        CODE_002 = data.CODE_002,
                        CODE_NAME = data.CODE_NAME,
                        CODE_TYPE = string.Empty,
                        CODE_USEYN = data.CODE_USEYN,
                        CODE_SORT = data.CODE_SORT,
                        CODE_UPDATE_SN = 1,
                        CODE_UPDATE_DATE = DateTime.Now.ToString("yyyyMMddHHmmss"),
                        CODE_DESC = data.CODE_DESC
                    };

                    쿼리_코드.GetInstance().수정(codeData);

                    //var client = new CodeServiceClient(SettingManager.ServerAddress);
                    //var result = client.Code001_Update(codeData);
                    //var result = DMS_코드쿼리.Update(codeData);

                    //if (result == null || !result.RESULT)
                    //{
                    //    Log.Error(new LogMsg { MethodName = "Code.Update", Msg = "Service Failed." });
                    //    return CodeReturnType.실패;
                    //}
                    //else
                    //{
                    //    Modify(data);
                    //    return CodeReturnType.성공;
                    //}



                    Modify(data);
                    return CodeReturnType.성공;
                }
            }
            catch (Exception ex)
            {
                return CodeReturnType.실패;
            }
        }

        public static CodeReturnType Update_3rd(DMS_CodeResponse data)
        {
            if (data == null || string.IsNullOrEmpty(data.CODE_001) || string.IsNullOrEmpty(data.CODE_002) || string.IsNullOrEmpty(data.CODE_003))
                return CodeReturnType.비어있음;

            try
            {
                var check = IsExitst_3rd(data.CODE_001, data.CODE_002, data.CODE_003);

                if (check == null)
                    return CodeReturnType.실패;
                else if (check == false)
                    return CodeReturnType.데이터비어있음;
                else
                {
                    var codeData = new Code003_UpdateRequestData()
                    {
                        DB_NAME = SettingManager.MYACCOUNT.ACCOUNT_DB_NAME,

                        CODE_001 = data.CODE_001,
                        CODE_002 = data.CODE_002,
                        CODE_003 = data.CODE_003,
                        CODE_NAME = data.CODE_NAME,
                        CODE_TYPE = string.Empty,
                        CODE_USEYN = data.CODE_USEYN,
                        CODE_SORT = data.CODE_SORT,
                        CODE_UPDATE_SN = 1,
                        CODE_UPDATE_DATE = DateTime.Now.ToString("yyyyMMddHHmmss"),
                        CODE_DESC = data.CODE_DESC
                    };

                    쿼리_코드.GetInstance().수정(codeData);

                    //var client = new CodeServiceClient(SettingManager.ServerAddress);
                    //var result = client.Code001_Update(codeData);
                    //var result = DMS_코드쿼리.Update(codeData);

                    //if (result == null || !result.RESULT)
                    //{
                    //    Log.Error(new LogMsg { MethodName = "Code.Update", Msg = "Service Failed." });
                    //    return CodeReturnType.실패;
                    //}
                    //else
                    //{
                    //    Modify(data);
                    //    return CodeReturnType.성공;
                    //}

                    Modify(data);
                    return CodeReturnType.성공;
                }
            }
            catch (Exception ex)
            {
                return CodeReturnType.실패;
            }
        }

        #endregion

        #region 05. 코드데이터 - 삭제

        public static CodeReturnType Delete_1st(DMS_CodeResponse data)
        {
            if (data == null || string.IsNullOrEmpty(data.CODE))
                return CodeReturnType.비어있음;

            try
            {
                // 하위 코드 데이터가 있는지 체크
                var underCheck = UnderCodeCheck_1st(data.CODE_001);
                if (underCheck == null)
                    return CodeReturnType.실패;
                else if (underCheck == true)
                    return CodeReturnType.하위데이터있음;

                var check = IsExitst_1st(data.CODE_001);

                if (check == null)
                    return CodeReturnType.실패;
                else if (check == false)
                    return CodeReturnType.데이터비어있음;
                else
                {
                    var codeData = new Code001_DeleteRequestData()
                    {
                        DB_NAME = SettingManager.MYACCOUNT.ACCOUNT_DB_NAME,

                        CODE_001 = data.CODE
                    };

                    //var client = new CodeServiceClient(SettingManager.ServerAddress);
                    //var result = client.Code001_Delete(codeData);

                    //var result = DMS_코드쿼리.Delete(codeData);

                    //if (result == null || !result.RESULT)
                    //{
                    //    Log.Error(new LogMsg { MethodName = "Code.Delete", Msg = "Service Failed." });
                    //    return CodeReturnType.실패;
                    //}
                    //else
                    //{
                    //    Remove(data);
                    //    return CodeReturnType.성공;
                    //}

                    return CodeReturnType.성공;
                }
            }
            catch (Exception ex)
            {
                return CodeReturnType.실패;
            }
        }

        public static CodeReturnType Delete_2nd(DMS_CodeResponse data)
        {
            if (data == null || string.IsNullOrEmpty(data.CODE))
                return CodeReturnType.비어있음;

            try
            {
                // 하위 코드 데이터가 있는지 체크
                var underCheck = UnderCodeCheck_2nd(data.CODE_001, data.CODE_002);
                if (underCheck == null)
                    return CodeReturnType.실패;
                else if (underCheck == true)
                    return CodeReturnType.하위데이터있음;

                var check = IsExitst_2nd(data.CODE_001, data.CODE_002);

                if (check == null)
                    return CodeReturnType.실패;
                else if (check == false)
                    return CodeReturnType.데이터비어있음;
                else
                {
                    var codeData = new Code002_DeleteRequestData()
                    {
                        DB_NAME = SettingManager.MYACCOUNT.ACCOUNT_DB_NAME,

                        CODE_001 = data.CODE_001,
                        CODE_002 = data.CODE

                    };

                    //var client = new CodeServiceClient(SettingManager.ServerAddress);
                    //var result = client.Code001_Delete(codeData);

                    //var result = DMS_코드쿼리.Delete(codeData);

                    //if (result == null || !result.RESULT)
                    //{
                    //    Log.Error(new LogMsg { MethodName = "Code.Delete", Msg = "Service Failed." });
                    //    return CodeReturnType.실패;
                    //}
                    //else
                    //{
                    //    Remove(data);
                    //    return CodeReturnType.성공;
                    //}

                    return CodeReturnType.성공;
                }
            }
            catch (Exception ex)
            {
                return CodeReturnType.실패;
            }
        }

        public static CodeReturnType Delete_3rd(DMS_CodeResponse data)
        {
            if (data == null || string.IsNullOrEmpty(data.CODE))
                return CodeReturnType.비어있음;

            try
            {
                // 하위 코드 데이터가 있는지 체크
                var check = IsExitst_3rd(data.CODE_001, data.CODE_002, data.CODE_003);
                if (check == null)
                    return CodeReturnType.실패;
                else if (check == false)
                    return CodeReturnType.데이터비어있음;
                else
                {
                    var codeData = new Code003_DeleteRequestData()
                    {
                        DB_NAME = SettingManager.MYACCOUNT.ACCOUNT_DB_NAME,

                        CODE_001 = data.CODE_001,
                        CODE_002 = data.CODE_002,
                        CODE_003 = data.CODE
                    };

                    //var client = new CodeServiceClient(SettingManager.ServerAddress);
                    //var result = client.Code001_Delete(codeData);

                    //var result = DMS_코드쿼리.Delete(codeData);

                    //if (result == null || !result.RESULT)
                    //{
                    //    Log.Error(new LogMsg { MethodName = "Code.Delete", Msg = "Service Failed." });
                    //    return CodeReturnType.실패;
                    //}
                    //else
                    //{
                    //    Remove(data);
                    //    return CodeReturnType.성공;
                    //}

                    return CodeReturnType.성공;
                }
            }
            catch (Exception ex)
            {
                return CodeReturnType.실패;
            }
        }

        #endregion

        #region 06. 코드데이터 - 중복 체크 <returns>true : 중복데이터 있음 / false : 중복데이터 없음 / null : 중복체크 에러

        private static bool? IsExitst_1st(string CD1)
        {
            try
            {
                var list = (from e in Code_List
                            where e.CODE_001 == CD1 && (e.CODE_002 == "---" || e.CODE_002 == "" || e.CODE_002 == null) && (e.CODE_003 == "---" || e.CODE_003 == "" || e.CODE_003 == null)
                            select e.CODE_001).FirstOrDefault();

                if (list == null || list.Count() < 1)
                    return false;

                return true;
            }
            catch (Exception ex)
            { return null; }
        }

        private static bool? IsExitst_2nd(string CD1, string CD2)
        {
            try
            {
                var list = (from e in Code_List
                            where e.CODE_001 == CD1 && e.CODE_002 == CD2 && (e.CODE_003 == "---" || e.CODE_003 == "" || e.CODE_003 == null)
                            select e.CODE_002).FirstOrDefault();

                if (list == null || list.Count() < 1)
                    return false;

                return true;
            }
            catch (Exception ex)
            { return null; }
        }

        private static bool? IsExitst_3rd(string CD1, string CD2, string CD3)
        {
            try
            {
                var list = (from e in Code_List
                            where e.CODE_001 == CD1 && e.CODE_002 == CD2 && e.CODE_003 == CD3
                            select e.CODE_003).FirstOrDefault();

                if (list == null || list.Count() < 1)
                    return false;

                return true;
            }
            catch (Exception ex)
            { return null; }
        }

        #endregion

        #region 07. 코드데이터 - 하위데이터 체크 <return>true : 하위데이터 있음  / false : 하위데이터 없음 / null : 하위체크 에러

        private static bool? UnderCodeCheck_1st(string CD1)
        {
            try
            {
                var list = from e in Code_List
                           where e.CODE_001 == CD1
                           select e;

                if (list == null || list.Count() < 2)
                    return false;

                return true;
            }
            catch
            { return null; }
        }

        private static bool? UnderCodeCheck_2nd(string CD1, string CD2)
        {
            try
            {
                var list = from e in Code_List
                           where e.CODE_001 == CD1 && e.CODE_002 == CD2
                           select e;

                if (list == null || list.Count() < 2)
                    return false;

                return true;
            }
            catch
            { return null; }
        }

        #endregion  

        public static List<DMS_CodeResponse> Get거래코드(string key)
        {
            try
            {
                return Code_List.Where(t => t.CODE_UPDATE_SN == long.Parse(key))
                                    .OrderBy(t => t.CODE)
                                    .OrderBy(t => t.CODE_SORT).ToList();
            }
            catch
            { return null; }
        }
    }
}
