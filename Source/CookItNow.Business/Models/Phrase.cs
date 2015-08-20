using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace CookItNow.Business.Models
{
    [DebuggerDisplay("{DebuggerDisplay}")]
    public class Phrase
    {
        public Phrase()
        {
            this.Parts = new List<Part>();
        }

        public IList<Part> Parts { get; set; }

        private string DebuggerDisplay
        {
            get
            {
                return string.Join(" ", this.Parts.Select(x => x.DebuggerDisplay));
            }
        }
    }
}