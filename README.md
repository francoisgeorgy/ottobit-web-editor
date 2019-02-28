Enzo web editor
===============

Control your Meris Enzo pedal with your web browser. View all the pedal's settings at once.

--screenshot--


Requirements
============

- A browser that support the [Web MIDI API](http://webaudio.github.io/web-midi-api/). Currently, 
only **Chrome** and **Opera** support this standard. 
- A [Meris MIDI I/O](https://www.meris.us/product/midi-i-o/) interface.
- A MIDI interface in your computer. This can be a homestudio audio interface or, if your computer support Bluetooth, 
you can use a MIDI Bluetooth adapter plugged into the Meris MIDI I/O interface. 


Usage
=====

1. Set the Enzo's EXP/MIDI connector for MIDI communication.
2. Set the Enzo's MIDI mode to MIDI OUT. 
3. Set the Enzo's MIDI PORT.
4. Connect the Enzo with the MIDI I/O interface. Use a stereo (TRS) jack cable.
5. Connect the MIDI I/O interface to your computer.
6. Open https://sysex.io/enzo/editor 
7. Allow the browser to access your MIDI devices.
8. In the top-right of the application, select the MIDI input and output devices corresponding to the the MIDI I/O and the MIDI port corresponding to your Enzo MIDI port setting.
9. Move a knob on your Enzo, the corresponding on-screen control must move accordingly. This tests the MIDI IN communication.
10. Play some sound through the Enzo and move a knob on the Editor. The sound should change as if you have moved the same control on the Enzo. This tests the MIDI OUT communication.
11. Enjoy your Enzo!


MIDI on the Enzo
----------------

If you can't get the MIDI communication working, check the following on the Enzo:

- The Global Settings EXP MODE is set to MIDI
- The Global Settings MIDI is set to MIDI OUT
- Choose a Global Settings MIDI CHANNEL.  
- The cable between the Enzo and the MIDI I/O interface is TRS (stereo).
- The MIDI I/O interface is powered on.
- The Enzo is powered on.
- The TSR cable is connected between one of the 4 MIDI I/O jack and the Enzo's EXP/MIDI connecter.
- The MIDI I/O interface is connected to your PC.
- The MIDI application uses the same channel as the Enzo's MIDI channel defined in the Global Settings.

Check the [Meris Enzo User Manual](https://www.meris.us/wp-content/uploads/2018/06/Meris_Enzo_Manual_v1c.pdf) and 
the [Meris MIDI I/O User Manual](https://www.meris.us/wp-content/uploads/2018/03/Meris_MIDI_IO_Full_Manual_v1b.pdf) 
for instructions about how to set the Enzo's Global Settings.


MIDI in the browser
-------------------

If you can't get the MIDI communication working, check the following on the browser:

- You use a browser that supports the [Web MIDI](https://www.midi.org/17-the-mma/99-web-midi) API specifications. 
Currently, only the following browsers [support](https://caniuse.com/#feat=midi) the Web MIDI API:

    - Chrome (Mac, Linux, Windows) 
    - Opera (Mac, Linux, Windows)

    Web MIDI is not support under iOS (iPad, iPhone). It may work under Android but I did not test it.

- The Web MIDI is not blocked by the browser. See below for information about this feature in Chrome.

### Web MIDI in Chrome

The first time you access an application that uses the WebMIDI API, the browser will ask you for permission.

--TODO: screenshot--

If you refuse access, then the Enzo Editor will display the following message:

    Waiting for MIDI interface access...
    ERROR: WebMidi could not be enabled.
    
You can change the permission at any time:

--TODO: screenshots--    
    
Menu: Settings / Advanced / Content settings / MIDI devices    

Menu: Settings / search for "midi" 

Application usage
=================

Setting up:
-----------

Once you have your Enzo connected to the MIDI I/O interface, you must configure the application:

1. Select the input device 
2. Select the output device
3. Select the MIDI channel
    You can leave the channel set to "all" but this is not recommended as this will send all messages to all channels every time and 
    this can perturb other MIDI devices you may have connected to your computer. 
    
The applications preferences (settings) are saved in your browser's _Local Storage_.      
    
Using the application:
----------------------

**IMPORTANT:** please keep in mind that the application has no possibility to _read_ the Enzo settings. When the application starts, 
the values displayed by the application will not reflect the current preset of the Enzo. 

You have two possibilities to synchronize the application with the Enzo:

1. From the Enzo, send the preset as Sysex Data (see _Enzo User Manual_ page 9). 
To do that, press the Bypass LED switch while holding the ALT button. The application will tell you when it has received a 
preset as SysEx.

--TODO: screenshots--

2. From the application, use the INIT or RANDOMIZE menu options to set all the values at once. 

From now on, until you select a new preset, the application will show the current settings of the Enzo.

### Changing preset

After you select a new preset, you need to re-sync the application. In that case, in order to keep the preset settings, you can
only send the preset as SysEx from the Enzo. After that, the application will show you the preset settings.


Bluetooth MIDI
==============

A small Bluetooth MIDI adapter such as the [Quicco Sound mi.1](https://www.thomann.de/intl/quicco_sound_mi.1_wireless_midi_adapter.htm) 
or [Yamaha MD-BT01](https://www.thomann.de/intl/yamaha_md_bt01_wireless_midi_adapter.htm) is a very convenient way to connect the 
MIDI I/O interface to your computer. 

![Quicco Sound mi.1](/images/quicco_sound_mi1.jpg "Quicco Sound mi.1")

![Yamaha MD-BT01](/images/yamaha_md_bt01.jpg "Yamaha MD-BT01")

If you have a Mac, here is how to connect with such an adapter:

--TODO: screenshot Mac config--    

--TODO: photo MIDI I/O with adapter--

 
MIDI tools
==========

If you use a MAc, check out the tools avaiable at https://www.snoize.com/. 


Limitations of this application
===============================

This application will _not_ work in Firefox, Safari, IE or Edge because these browsers do not support the Web MIDI API. 

The application will not work under iOS (iPad, iPhone). 

This application has mainly be tested with Chrome on a MacBook pro running the latest OS release. Some tests have been 
done with success with Chrome under Linux Mint 17.1 and with Chrome under Windows 10. 

Still under active development. Feel free to log bugs/issues. This is a development I'm doing during my freetime. 


Known issues
============

The TEMPO value is not saved. If a preset uses a tempo value different from 0, then you have to set the tempo manually after loading the preset.

There's still some issues with the preset loading from a bookmarked URL.

It is not possible to capture the press & hold of the TAP footswitch because the Enzo only sends a message for when the footswitch is pressed, but not for when it is released.


MIDI in your browser
====================

You need to allow your browser to use your MIDI device:

![screenshot](/images/help-01.png "midi settings in Chrome")

In case you didn't allow the use of MIDI device and want to change that, you can right-click on the URL icon and change the setting:
        
![screenshot](/images/help-02.png "midi settings in Chrome")


Contribute
==========

This editor is an Open Source project. You are welcome to contribute.

To contribute your bug fixes, new features, etc.: 1) fork the project, 2) create a pull-request.


Trademarks
==========

This application is not endorsed by, directly affiliated with, maintained, or sponsored by Meris.             


License and disclaimer
======================

This application is published under [GNU General Public License v3](https://www.gnu.org/licenses/gpl-3.0.en.html).

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of 
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You can view and get a copy the license at https://www.gnu.org/licenses/licenses.en.html#GPL.
