using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HK.SmartERP.LIB.Tools
{
    public class TaskTool
    {
        public TaskTool(ITask iTask)
        {
            _iTask = iTask;
            DurationSec = 30;
        }

        private ITask _iTask;
        private Task _task;
        private bool _running = true;

        public bool IsRunning { get { return _task != null; } }
        public int DurationSec { set; get; }

        public void Run()
        {
            _running = true;
            _task = Task.Run(new Action(() => LoopFn()));
        }

        private void LoopFn()
        {
            while (_running)
            {
                _iTask.Run();
                System.Threading.Thread.Sleep(DurationSec * 1000);
            }
        }

        public void Stop()
        {
            if (_task == null)
                return;
            _running = false;
            //_task.Wait();
            _task = null;
        }
    }

    public interface ITask
    {
        void Run();
    }
}
