using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;

namespace HK.SmartERP.LIB
{
    //public static class Log
    //{
    //    public static void Trace(LogMsg logMsg, [CallerMemberName] string methodName = "")
    //    {
    //        LogConfig.GetLogger(logMsg.LoggerName).Trace(logMsg.ToString(methodName));
    //    }

    //    public static void Debug(LogMsg logMsg, [CallerMemberName] string methodName = "")
    //    {
    //        LogConfig.GetLogger(logMsg.LoggerName).Debug(logMsg.ToString(methodName));
    //    }

    //    public static void Info(LogMsg logMsg, [CallerMemberName] string methodName = "")
    //    {
    //        LogConfig.GetLogger(logMsg.LoggerName).Info(logMsg.ToString(methodName));
    //    }

    //    public static void Warn(LogMsg logMsg, [CallerMemberName] string methodName = "")
    //    {
    //        LogConfig.GetLogger(logMsg.LoggerName).Warn(logMsg.ToString(methodName));
    //    }

    //    public static void Error(LogMsg logMsg, [CallerMemberName] string methodName = "")
    //    {
    //        LogConfig.GetLogger(logMsg.LoggerName).Error(logMsg.ToString(methodName));
    //    }

    //    public static void Fatal(LogMsg logMsg, [CallerMemberName] string methodName = "")
    //    {
    //        LogConfig.GetLogger(logMsg.LoggerName).Fatal(logMsg.ToString(methodName));
    //    }
    //}

    //public static class LogConfig
    //{
    //    static LogConfig()
    //    {
    //        _LogLevel = LogLevels.Trace;
    //        DefaultLoggerName = "Log";
    //        UseConsole = false;
    //        _useLogViewer = false;
    //        LogViewerAddress = "127.0.0.1:4505";

    //        _logFileName = "${basedir}/Logs/${shortdate}.log";
    //        _logLayout = "${longdate}|${level:uppercase=true}|${logger}|${message}";

    //        SetConfig();
    //    }

    //    #region Configuration

    //    public static string DefaultLoggerName { set; get; }
    //    public static string LogViewerAddress { set; get; }

    //    private static bool _useLogViewer;
    //    public static bool UseLogViewer
    //    {
    //        set
    //        {
    //            _useLogViewer = value;
    //            SetConfig();
    //        }
    //        get { return _useLogViewer; }
    //    }

    //    public static void SetLogLevel(string level)
    //    {
    //        var s = level.ToLower();
    //        switch (s)
    //        {
    //            case "none": LogLevel = LogLevels.None; break;
    //            case "fatal": LogLevel = LogLevels.Fatal; break;
    //            case "error": LogLevel = LogLevels.Error; break;
    //            case "warn": LogLevel = LogLevels.Warn; break;
    //            case "info": LogLevel = LogLevels.Info; break;
    //            case "debug": LogLevel = LogLevels.Debug; break;
    //            case "trace": LogLevel = LogLevels.Trace; break;
    //            default: break;
    //        }
    //    }

    //    private static LogLevels _LogLevel;
    //    public static LogLevels LogLevel
    //    {
    //        set
    //        {
    //            _LogLevel = value;

    //            switch (_LogLevel)
    //            {
    //                case LogLevels.None:
    //                    ChangeLevel(NLog.LogLevel.Off);
    //                    break;
    //                case LogLevels.Fatal:
    //                    ChangeLevel(NLog.LogLevel.Fatal);
    //                    break;
    //                case LogLevels.Error:
    //                    ChangeLevel(NLog.LogLevel.Error);
    //                    break;
    //                case LogLevels.Warn:
    //                    ChangeLevel(NLog.LogLevel.Warn);
    //                    break;
    //                case LogLevels.Info:
    //                    ChangeLevel(NLog.LogLevel.Info);
    //                    break;
    //                case LogLevels.Debug:
    //                    ChangeLevel(NLog.LogLevel.Debug);
    //                    break;
    //                case LogLevels.Trace:
    //                    ChangeLevel(NLog.LogLevel.Trace);
    //                    break;
    //            }
    //        }
    //        get { return _LogLevel; }
    //    }

    //    public static bool UseConsole { set; get; }

    //    private static string _logLayout;
    //    public static string LogLayout
    //    {
    //        set
    //        {
    //            _logLayout = value;
    //            SetConfig();
    //        }
    //        get { return _logLayout; }
    //    }

    //    private static string _logFileName;
    //    public static string LogFileName
    //    {
    //        set
    //        {
    //            _logFileName = value;
    //            SetConfig();
    //        }
    //        get { return _logFileName; }
    //    }

    //    internal static Logger GetLogger(string name)
    //    {
    //        return LogManager.GetLogger(name);
    //    }

    //    private static void SetConfig()
    //    {
    //        var config = new LoggingConfiguration();

    //        var fileTarget = new FileTarget()
    //        {
    //            FileName = _logFileName,
    //            Layout = _logLayout
    //        };

    //        config.AddTarget("fileLog", fileTarget);
    //        var logRule = new LoggingRule("*", NLog.LogLevel.Trace, fileTarget);
    //        config.LoggingRules.Add(logRule);


    //        if (UseLogViewer)
    //        {
    //            var logViewerTarget = new NLogViewerTarget()
    //            {
    //                Name = "LogViewer",
    //                Address = "tcp://" + LogViewerAddress,
    //                Layout = _logLayout
    //            };

    //            config.AddTarget("logViewer", logViewerTarget);
    //            var logRuleforLogViewer = new LoggingRule("*", NLog.LogLevel.Trace, logViewerTarget);
    //            config.LoggingRules.Add(logRuleforLogViewer);
    //        }

    //        LogManager.Configuration = config;
    //    }

    //    private static void ChangeLevel(NLog.LogLevel level)
    //    {
    //        LogManager.GlobalThreshold = level;
    //    }

    //    #endregion
    //}

    //public class LogMsg
    //{
    //    public LogMsg()
    //    {
    //        this.LoggerName = LogConfig.DefaultLoggerName;
    //    }

    //    public string LoggerName { set; get; }

    //    public object Logger
    //    {
    //        set { LoggerName = value.GetType().Name; }
    //    }

    //    public object Data { set; get; }
    //    public string MethodName { set; get; }
    //    public string Msg { set; get; }
    //    public Exception Exception { set; get; }
    //    public string StackTrace { set; get; }

    //    private const string MsgFormat = "[{0}] {1}    ";
    //    private const string ObjectFormat = "\r\n[{0}] {1}    ";
    //    private const string ExceptionFormat = "\r\n[Exception] {0}    ";
    //    private const string StackTraceFormat = "\r\n[StackTrace] {0}";

    //    public string ToString(string methodName)
    //    {
    //        var sb = new System.Text.StringBuilder();

    //        sb.AppendFormat(MsgFormat, methodName, this.Msg);

    //        if (this.Data != null)
    //            sb.AppendFormat(ObjectFormat, this.Data.GetType().Name, Newtonsoft.Json.JsonConvert.SerializeObject(this.Data));

    //        if (this.Exception != null)
    //            sb.AppendFormat(ExceptionFormat, this.Exception);

    //        if (this.StackTrace != null)
    //            sb.AppendFormat(StackTraceFormat, this.StackTrace);

    //        return sb.ToString();
    //    }
    //}

    //public enum LogLevels { None, Fatal, Error, Warn, Info, Debug, Trace };
}
