using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlockchainIdentitySystem.Models
{
    public class SchoolInfo
    {
        public string schoolname { get; set; }
        public string classes { get; set; }
        public string level { get; set; }
        public string schoolfeeAmount { get; set; }
        public string term { get; set; }
        public bool NeedAcaAttension { get; set; }
    }
}