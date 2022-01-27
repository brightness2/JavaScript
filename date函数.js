/**
 * 和PHP一样的时间戳格式化函数
 * @param {string} format 格式
 * @param {int} timestamp 要格式化的时间 默认为当前时间
 * @return {string}   格式化的时间字符串
 */
export const zDate = (format, timestamp) => {
    let a,
        jsdate = timestamp ? new Date(timestamp) : new Date();
    let pad = (n, c) => {
        if ((n = n + "").length < c) {
            return new Array(++c - n.length).join("0") + n;
        } else {
            return n;
        }
    };
    let txt_weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let txt_ordin = {
        1: "st",
        2: "nd",
        3: "rd",
        21: "st",
        22: "nd",
        23: "rd",
        31: "st",
    };
    let txt_months = [
        "",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let f = {
        //Day
        d: () => {
            return pad(f.j(), 2);
        },
        D: () => {
            return f.l().substr(0, 3);
        },
        j: () => {
            return jsdate.getDate();
        },
        l: () => {
            return txt_weekdays[f.w()];
        },
        N: () => {
            return f.w() + 1;
        },
        S: () => {
            return txt_ordin[f.j()] ? txt_ordin[f.j()] : "th";
        },
        w: () => {
            return jsdate.getDay();
        },
        z: () => {
            return (
                ((jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5) >>
                0
            );
        },
        // Week,周数，从星期一开始的周数查询
        W: () => {
            var a = f.z(),
                b = 364 + f.L() - a;
            var nd2,
                nd =
                    (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
            if (b <= 2 && (jsdate.getDay() || 7) - 1 <= 2 - b) {
                return 1;
            } else {
                if (a <= 2 && nd >= 4 && a >= 6 - nd) {
                    nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
                    return date("W", Math.round(nd2.getTime() / 1000));
                } else {
                    return (
                        (1 + (nd <= 3 ? (a + nd) / 7 : (a - (7 - nd)) / 7)) >> 0
                    );
                }
            }
        },
        // Month
        F: () => {
            return txt_months[f.n()];
        },
        m: () => {
            return pad(f.n(), 2);
        },
        M: () => {
            return f.F().substr(0, 3);
        },
        n: () => {
            return jsdate.getMonth() + 1;
        },
        t: () => {
            var n;
            if ((n = jsdate.getMonth() + 1) == 2) {
                return 28 + f.L();
            } else {
                if ((n & 1 && n < 8) || (!(n & 1) && n > 7)) {
                    return 31;
                } else {
                    return 30;
                }
            }
        },
        // Year
        L: () => {
            var y = f.Y();
            return !(y & 3) && (y % 1e2 || !(y % 4e2)) ? 1 : 0;
        },
        //o not supported yet
        Y: () => {
            return jsdate.getFullYear();
        },
        y: () => {
            return (jsdate.getFullYear() + "").slice(2);
        },
        // Time
        a: () => {
            return jsdate.getHours() > 11 ? "pm" : "am";
        },
        A: () => {
            return f.a().toUpperCase();
        },
        B: () => {
            // peter paul koch:
            var off = (jsdate.getTimezoneOffset() + 60) * 60;
            var theSeconds =
                jsdate.getHours() * 3600 +
                jsdate.getMinutes() * 60 +
                jsdate.getSeconds() +
                off;
            var beat = Math.floor(theSeconds / 86.4);
            if (beat > 1000) beat -= 1000;
            if (beat < 0) beat += 1000;
            if (String(beat).length == 1) beat = "00" + beat;
            if (String(beat).length == 2) beat = "0" + beat;
            return beat;
        },
        g: () => {
            return jsdate.getHours() % 12 || 12;
        },
        G: () => {
            return jsdate.getHours();
        },
        h: () => {
            return pad(f.g(), 2);
        },
        H: () => {
            return pad(jsdate.getHours(), 2);
        },
        i: () => {
            return pad(jsdate.getMinutes(), 2);
        },
        s: () => {
            return pad(jsdate.getSeconds(), 2);
        },
        //u not supported yet

        // Timezone
        //e not supported yet
        //I not supported yet
        O: () => {
            var t = pad(Math.abs((jsdate.getTimezoneOffset() / 60) * 100), 4);
            if (jsdate.getTimezoneOffset() > 0) t = "-" + t;
            else t = "+" + t;
            return t;
        },
        P: () => {
            var O = f.O();
            return O.substr(0, 3) + ":" + O.substr(3, 2);
        },
        //T not supported yet
        //Z not supported yet

        // Full Date/Time
        c: () => {
            return (
                f.Y() +
                "-" +
                f.m() +
                "-" +
                f.d() +
                "T" +
                f.h() +
                ":" +
                f.i() +
                ":" +
                f.s() +
                f.P()
            );
        },
        //r not supported yet
        U: () => {
            return Math.round(jsdate.getTime() / 1000);
        },
    };
    //return

    return format.replace(/[\]?[a-zA-Z]/g, (t, s) => {
        return f[t]();
    });
};

export const  formatDate = (date,format)=>{
    function _zero(num){
        if(num<10){
            return '0'+num
        }
        return num;
    }
    let obj={
        'yyyy':date.getFullYear(),
        'yy':date.getFullYear()%100,
        'MM':_zero(date.getMonth()+1),
        'M':date.getMonth()+1,
        'dd':_zero(date.getDate()),
        'd':date.getDate(),
        'HH':_zero(date.getHours()),
        'H':date.getHours(),
        'hh':_zero(date.getHours()%12),
        'h':date.getHours()%12,
        'mm':_zero(date.getMinutes()),
        'm':date.getMinutes(),
        'ss':_zero(date.getSeconds()),
        's':date.getSeconds(),
        'w':function(){
            arr = ['日', '一', '二', '三', '四', '五', '六'];
            return arr[date.getDay()];
        }()
    }

    for (const key in obj) {
        format = format.replace(key,obj[key])
    }
    return format;
}