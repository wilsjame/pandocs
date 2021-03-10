(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{352:function(e,t,i){"use strict";i.r(t);var n=i(42),a=Object(n.a)({},(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[i("h1",{attrs:{id:"timer-obscure-behaviour"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#timer-obscure-behaviour"}},[e._v("#")]),e._v(" Timer obscure behaviour")]),e._v(" "),i("h2",{attrs:{id:"timer-global-circuit"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#timer-global-circuit"}},[e._v("#")]),e._v(" Timer Global Circuit")]),e._v(" "),i("p",[i("img",{attrs:{src:"imgs/timer_simplified.svg",alt:"",title:"imgs/timer_simplified.svg"}})]),e._v(" "),i("h2",{attrs:{id:"relation-between-timer-and-divider-register"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#relation-between-timer-and-divider-register"}},[e._v("#")]),e._v(" Relation between Timer and Divider register")]),e._v(" "),i("p",[e._v("This is a schematic of the circuit involving TAC and DIV:")]),e._v(" "),i("p",[i("img",{attrs:{src:"imgs/timer_tac_bug_dmg.svg",alt:"",title:"imgs/timer_tac_bug_dmg.svg"}})]),e._v(" "),i("p",[e._v("Notice how the values that are connected to the inputs of the\nmultiplexer are the values of those bits, not the carry of those bits.\nThis is the reason of a few things:")]),e._v(" "),i("ul",[i("li",[i("p",[e._v("When writing to DIV, the whole counter is reset, so the timer is\nalso affected.")])]),e._v(" "),i("li",[i("p",[e._v("When writing to DIV, if the current output is 1 and timer is\nenabled, as the new value after reseting DIV will be 0, the falling\nedge detector will detect a falling edge and TIMA will increase.")])]),e._v(" "),i("li",[i("p",[e._v("When writing to TAC, if the previously selected multiplexer input was\n1 and the new input is 0, TIMA will increase too. This doesnt\nhappen when the timer is disabled, but it also happens when disabling\nthe timer (the same effect as writing to DIV). The following code explains the behaviour in DMG and MGB.")])])]),e._v(" "),i("div",{staticClass:"language- extra-class"},[i("pre",{pre:!0,attrs:{class:"language-text"}},[i("code",[e._v("    clocks_array[4] = {1024, 16, 64, 256}\n\n    old_clocks = clocks_array[old_TAC&3]\n    new_clocks = clocks_array[new_TAC&3]\n\n    old_enable = old_TAC & BIT(2)\n    new_enable = new_TAC & BIT(2)\n\n    sys_clocks = 16 bit system counter\n\n    IF old_enable == 0 THEN\n        glitch = 0 (*)\n    ELSE\n        IF new_enable == 0 THEN\n            glitch = (sys_clocks & (old_clocks/2)) != 0\n        ELSE\n            glitch = ((sys_clocks & (old_clocks/2)) != 0) && ((sys_clocks & (new_clocks/2)) == 0)\n        END IF\n    END IF\n")])])]),i("p",[e._v("The sentence marked with a (*) has a different behaviour in GBC (AGB\nand AGS seem to have strange behaviour even in the other statements).\nWhen enabling the timer and maintaining the same frequency it doesnt\nglitch. When disabling the timer it doesnt glitch either. When another\nchange of value happens (so timer is enabled after the write), the\nbehaviour depends on a race condition, so it cannot be predicted for\nevery device.")]),e._v(" "),i("h2",{attrs:{id:"timer-overflow-behaviour"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#timer-overflow-behaviour"}},[e._v("#")]),e._v(" Timer Overflow Behaviour")]),e._v(" "),i("p",[e._v("When TIMA overflows, the value from TMA is loaded and IF timer flag is\nset to 1, but this doesnt happen immediately. Timer interrupt is\ndelayed 1 cycle (4 clocks) from the TIMA overflow. The TMA reload to\nTIMA is also delayed. For one cycle, after overflowing TIMA, the value\nin TIMA is 00h, not TMA. This happens only when an overflow happens, not\nwhen the upper bit goes from 1 to 0, it cant be done manually writing\nto TIMA, the timer has to increment itself.")]),e._v(" "),i("p",[e._v("For example (SYS is the system internal counter divided by 4 for easier\nunderstanding, each increment of the graph is 1 cycle, not 1 clock):")]),e._v(" "),i("div",{staticClass:"language- extra-class"},[i("pre",[i("code",[e._v("Timer overflows:\n\n              [A] [B]\nSYS  FD FE FF |00| 01 02 03\nTIMA FF FF FF |00| 23 23 23\nTMA  23 23 23 |23| 23 23 23\nIF   E0 E0 E0 |E0| E4 E4 E4\n\nTimer doesn't overflow:\n\n              [C]\nSYS  FD FE FF 00 01 02 03\nTIMA 45 45 45 46 46 46 46\nTMA  23 23 23 23 23 23 23\nIF   E0 E0 E0 E0 E0 E0 E0\n")])])]),i("ul",[i("li",[i("p",[e._v("During the strange cycle [A] you can prevent the IF flag from being\nset and prevent the TIMA from being reloaded from TMA by writing a value\nto TIMA. That new value will be the one that stays in the TIMA register\nafter the instruction. Writing to DIV, TAC or other registers wont\nprevent the IF flag from being set or TIMA from being reloaded.")])]),e._v(" "),i("li",[i("p",[e._v("If you write to TIMA during the cycle that TMA is being loaded to it\n[B], the write will be ignored and TMA value will be written to TIMA\ninstead.")])]),e._v(" "),i("li",[i("p",[e._v("If TMA is written the same cycle it is loaded to TIMA [B], TIMA is\nalso loaded with that value.")])]),e._v(" "),i("li",[i("p",[e._v("This is a guessed schematic to explain the priorities with registers\nTIMA and TMA:")])])]),e._v(" "),i("p",[i("img",{attrs:{src:"imgs/timer_tima_tma_detailed.svg",alt:"",title:"imgs/timer_tima_tma_detailed.svg"}})]),e._v(" "),i("p",[e._v("TMA is a latch. As soon as it is written, the output shows that value.\nThat explains that when TMA is written and TIMA is being incremented,\nthe value written to TMA is also written to TIMA. It doesnt affect the\nIF flag, though.")])])}),[],!1,null,null,null);t.default=a.exports}}]);