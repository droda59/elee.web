using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace CookItNow.Business.Models
{
    [DebuggerDisplay("{DebuggerDisplay}")]
    public class Step  
    {
        public Step()
        {
            this.Parts = new List<Part>();
            this.PostSteps = new List<Step>();
        }

        public int SubrecipeId { get; set; }

        public IList<Part> Parts { get; set; }

        public IList<Step> PostSteps { get; set; }

        private string DebuggerDisplay
        {
            get
            {
                return string.Join(" ", this.Parts.Select(x => x.DebuggerDisplay));
            }
        }
    }
}