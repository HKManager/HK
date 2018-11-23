using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CustomRenderer.Views
{

    public class pageMainMenuItem
    {
        public pageMainMenuItem()
        {
            TargetType = typeof(pageMainDetail);
        }
        public int Id { get; set; }
        public string Title { get; set; }

        public Type TargetType { get; set; }
    }
}