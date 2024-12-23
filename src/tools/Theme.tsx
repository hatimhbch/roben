import { Show } from "solid-js";
import type { ThemeProps, ThemeOptionsProps, ThemeType } from "~/types";

const ThemeOptions = ({ theme, handleThemeSelection }: ThemeOptionsProps) => {
  switch (theme()) {
    case 'system':
      return (
        <div class="flex flex-col items-center gap-3 sm:w-[120px]">
          <div class="flex justify-center gap-3 w-full">
            <button onClick={() => handleThemeSelection('light')} class="sm:w-12 sm:h-12 flex items-center justify-center">
              <svg class="w-[27.7px] ml-[-2px] my-1 fill-[#454545] dark:fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Light"> <g> <path d="M12,18.09A6.09,6.09,0,1,1,18.09,12,6.1,6.1,0,0,1,12,18.09ZM12,6.91A5.09,5.09,0,1,0,17.09,12,5.1,5.1,0,0,0,12,6.91Z"></path> <path d="M11.5,2.568v1.6a.5.5,0,1,0,1,0v-1.6a.5.5,0,1,0-1,0Z"></path> <path d="M12.5,21.432v-1.6a.5.5,0,0,0-1,0v1.6a.5.5,0,1,0,1,0Z"></path> <path d="M21.432,11.5h-1.6a.5.5,0,0,0,0,1h1.6a.5.5,0,1,0,0-1Z"></path> <path d="M2.568,12.5h1.6a.5.5,0,1,0,0-1h-1.6a.5.5,0,1,0,0,1Z"></path> <path d="M18.316,4.977l-.992.992-.141.141a.514.514,0,0,0-.146.353.508.508,0,0,0,.146.354.5.5,0,0,0,.354.146.515.515,0,0,0,.353-.146l.992-.992.141-.141a.515.515,0,0,0,.147-.354.508.508,0,0,0-.147-.353.5.5,0,0,0-.353-.147.522.522,0,0,0-.354.147Z"></path> <path d="M5.684,19.023l.992-.992.141-.141a.514.514,0,0,0,.146-.353.508.508,0,0,0-.146-.354.5.5,0,0,0-.354-.146.515.515,0,0,0-.353.146l-.992.992-.141.141a.515.515,0,0,0-.147.354.508.508,0,0,0,.147.353.5.5,0,0,0,.353.147.522.522,0,0,0,.354-.147Z"></path> <path d="M19.023,18.316l-.992-.992-.141-.141a.514.514,0,0,0-.353-.146.508.508,0,0,0-.354.146.5.5,0,0,0-.146.354.515.515,0,0,0,.146.353l.992.992.141.141a.515.515,0,0,0,.354.147.508.508,0,0,0,.353-.147.5.5,0,0,0,.147-.353.522.522,0,0,0-.147-.354Z"></path> <path d="M4.977,5.684l.992.992.141.141a.514.514,0,0,0,.353.146.508.508,0,0,0,.354-.146.5.5,0,0,0,.146-.354.515.515,0,0,0-.146-.353l-.992-.992-.141-.141A.515.515,0,0,0,5.33,4.83a.508.508,0,0,0-.353.147.5.5,0,0,0-.147.353.522.522,0,0,0,.147.354Z"></path> </g> </g> </g></svg>
            </button>
            <button onClick={() => handleThemeSelection('dark')} class="sm:w-12 sm:h-12 flex items-center justify-center">
              <svg class="w-[24px] my-auto fill-[#454545] dark:fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.741,20.917a9.389,9.389,0,0,1-1.395-.105,9.141,9.141,0,0,1-1.465-17.7,1.177,1.177,0,0,1,1.21.281,1.273,1.273,0,0,1,.325,1.293,8.112,8.112,0,0,0-.353,2.68,8.266,8.266,0,0,0,4.366,6.857,7.628,7.628,0,0,0,3.711.993,1.242,1.242,0,0,1,.994,1.963h0A9.148,9.148,0,0,1,12.741,20.917ZM10.261,4.05a.211.211,0,0,0-.065.011,8.137,8.137,0,1,0,9.131,12.526h0a.224.224,0,0,0,.013-.235.232.232,0,0,0-.206-.136A8.619,8.619,0,0,1,14.946,15.1a9.274,9.274,0,0,1-4.883-7.7,9.123,9.123,0,0,1,.4-3.008.286.286,0,0,0-.069-.285A.184.184,0,0,0,10.261,4.05Z"></path></svg>
            </button>
          </div>
        </div>
      );
    case 'light':
      return (
        <div class="flex flex-col items-center gap-3 sm:w-[120px]">
          <div class="flex justify-center gap-3 w-full">
            <button onClick={() => handleThemeSelection('system')} class="sm:w-12 sm:h-12 flex items-center justify-center">
              <svg class="w-[23px] my-1 fill-[#454545] dark:fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Laptop"> <path d="M21.485,16.155a.992.992,0,0,0-.77-.36h-.33V6.565a2.5,2.5,0,0,0-2.5-2.5H6.115a2.5,2.5,0,0,0-2.5,2.5V15.8h-.34a1,1,0,0,0-.98,1.17l.3,1.73a1.5,1.5,0,0,0,1.48,1.24h15.85a1.5,1.5,0,0,0,1.48-1.24l.3-1.73A.986.986,0,0,0,21.485,16.155ZM4.615,6.565a1.5,1.5,0,0,1,1.5-1.5h11.77a1.5,1.5,0,0,1,1.5,1.5V15.8H4.615Zm15.8,11.96a.494.494,0,0,1-.49.41H4.075a.494.494,0,0,1-.49-.41l-.31-1.73h17.44Z"></path> </g> </g></svg>
            </button>
            <button onClick={() => handleThemeSelection('dark')} class="sm:w-12 sm:h-12 flex items-center justify-center">
              <svg class="w-[24px] my-auto fill-[#454545] dark:fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.741,20.917a9.389,9.389,0,0,1-1.395-.105,9.141,9.141,0,0,1-1.465-17.7,1.177,1.177,0,0,1,1.21.281,1.273,1.273,0,0,1,.325,1.293,8.112,8.112,0,0,0-.353,2.68,8.266,8.266,0,0,0,4.366,6.857,7.628,7.628,0,0,0,3.711.993,1.242,1.242,0,0,1,.994,1.963h0A9.148,9.148,0,0,1,12.741,20.917ZM10.261,4.05a.211.211,0,0,0-.065.011,8.137,8.137,0,1,0,9.131,12.526h0a.224.224,0,0,0,.013-.235.232.232,0,0,0-.206-.136A8.619,8.619,0,0,1,14.946,15.1a9.274,9.274,0,0,1-4.883-7.7,9.123,9.123,0,0,1,.4-3.008.286.286,0,0,0-.069-.285A.184.184,0,0,0,10.261,4.05Z"></path></svg>
            </button>
          </div>
        </div>
      );
    case 'dark':
      return (
        <div class="flex flex-col items-center gap-3 sm:w-[120px]">
          <div class="flex justify-center gap-3 w-full">
            <button onClick={() => handleThemeSelection('system')} class="sm:w-12 sm:h-12 flex items-center justify-center">
              <svg class="w-[23px] my-1 fill-[#454545] dark:fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Laptop"> <path d="M21.485,16.155a.992.992,0,0,0-.77-.36h-.33V6.565a2.5,2.5,0,0,0-2.5-2.5H6.115a2.5,2.5,0,0,0-2.5,2.5V15.8h-.34a1,1,0,0,0-.98,1.17l.3,1.73a1.5,1.5,0,0,0,1.48,1.24h15.85a1.5,1.5,0,0,0,1.48-1.24l.3-1.73A.986.986,0,0,0,21.485,16.155ZM4.615,6.565a1.5,1.5,0,0,1,1.5-1.5h11.77a1.5,1.5,0,0,1,1.5,1.5V15.8H4.615Zm15.8,11.96a.494.494,0,0,1-.49.41H4.075a.494.494,0,0,1-.49-.41l-.31-1.73h17.44Z"></path> </g> </g></svg>
            </button>
            <button onClick={() => handleThemeSelection('light')} class="sm:w-12 sm:h-12 flex items-center justify-center">
              <svg class="w-[27.7px] ml-[-2px] my-auto fill-[#454545] dark:fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Light"> <g> <path d="M12,18.09A6.09,6.09,0,1,1,18.09,12,6.1,6.1,0,0,1,12,18.09ZM12,6.91A5.09,5.09,0,1,0,17.09,12,5.1,5.1,0,0,0,12,6.91Z"></path> <path d="M11.5,2.568v1.6a.5.5,0,1,0,1,0v-1.6a.5.5,0,1,0-1,0Z"></path> <path d="M12.5,21.432v-1.6a.5.5,0,0,0-1,0v1.6a.5.5,0,1,0,1,0Z"></path> <path d="M21.432,11.5h-1.6a.5.5,0,0,0,0,1h1.6a.5.5,0,1,0,0-1Z"></path> <path d="M2.568,12.5h1.6a.5.5,0,1,0,0-1h-1.6a.5.5,0,1,0,0,1Z"></path> <path d="M18.316,4.977l-.992.992-.141.141a.514.514,0,0,0-.146.353.508.508,0,0,0,.146.354.5.5,0,0,0,.354.146.515.515,0,0,0,.353-.146l.992-.992.141-.141a.515.515,0,0,0,.147-.354.508.508,0,0,0-.147-.353.5.5,0,0,0-.353-.147.522.522,0,0,0-.354.147Z"></path> <path d="M5.684,19.023l.992-.992.141-.141a.514.514,0,0,0,.146-.353.508.508,0,0,0-.146-.354.5.5,0,0,0-.354-.146.515.515,0,0,0-.353.146l-.992.992-.141.141a.515.515,0,0,0-.147.354.508.508,0,0,0,.147.353.5.5,0,0,0,.353.147.522.522,0,0,0,.354-.147Z"></path> <path d="M19.023,18.316l-.992-.992-.141-.141a.514.514,0,0,0-.353-.146.508.508,0,0,0-.354.146.5.5,0,0,0-.146.354.515.515,0,0,0,.146.353l.992.992.141.141a.515.515,0,0,0,.354.147.508.508,0,0,0,.353-.147.5.5,0,0,0,.147-.353.522.522,0,0,0-.147-.354Z"></path> <path d="M4.977,5.684l.992.992.141.141a.514.514,0,0,0,.353.146.508.508,0,0,0,.354-.146.5.5,0,0,0,.146-.354.515.515,0,0,0-.146-.353l-.992-.992-.141-.141A.515.515,0,0,0,5.33,4.83a.508.508,0,0,0-.353.147.5.5,0,0,0-.147.353.522.522,0,0,0,.147.354Z"></path> </g> </g> </g></svg>
            </button>
          </div>
        </div>
      );
  }
};

const Theme = ({ theme, setTheme, isThemeDropdownVisible, setIsThemeDropdownVisible }: ThemeProps) => {
  const handleThemeSelection = (selectedTheme: ThemeType) => {
    setTheme(selectedTheme);
    setIsThemeDropdownVisible(false);
  };

  return (
    <>
      <Show when={isThemeDropdownVisible()}>
        <div class="absolute top-12 right-[84px] sm:top-10 sm:right-1/2 sm:translate-x-1/2 w-auto block bg-white dark:bg-black rounded-lg shadow-lg">
          <ThemeOptions theme={theme} handleThemeSelection={handleThemeSelection} />
        </div>
      </Show>
      <button  type="button" class="theme-toggle-button sm:px" aria-label="Toggle Theme"
        onClick={() => setIsThemeDropdownVisible(!isThemeDropdownVisible())}>
        <Show when={theme() === 'system'} 
                fallback={
                  <Show when={theme() === 'light'} fallback={<svg class="w-[27.7px] my-auto pr-1 fill-[#454545] dark:fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.741,20.917a9.389,9.389,0,0,1-1.395-.105,9.141,9.141,0,0,1-1.465-17.7,1.177,1.177,0,0,1,1.21.281,1.273,1.273,0,0,1,.325,1.293,8.112,8.112,0,0,0-.353,2.68,8.266,8.266,0,0,0,4.366,6.857,7.628,7.628,0,0,0,3.711.993,1.242,1.242,0,0,1,.994,1.963h0A9.148,9.148,0,0,1,12.741,20.917ZM10.261,4.05a.211.211,0,0,0-.065.011,8.137,8.137,0,1,0,9.131,12.526h0a.224.224,0,0,0,.013-.235.232.232,0,0,0-.206-.136A8.619,8.619,0,0,1,14.946,15.1a9.274,9.274,0,0,1-4.883-7.7,9.123,9.123,0,0,1,.4-3.008.286.286,0,0,0-.069-.285A.184.184,0,0,0,10.261,4.05Z"></path></svg>}>
                    <svg class="w-[27px] my-auto pr-1 fill-[#282828] stroke-[#282828] dark:fill-white" stroke-width="0.28" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Light"> <g> <path d="M12,18.09A6.09,6.09,0,1,1,18.09,12,6.1,6.1,0,0,1,12,18.09ZM12,6.91A5.09,5.09,0,1,0,17.09,12,5.1,5.1,0,0,0,12,6.91Z"></path> <path d="M11.5,2.568v1.6a.5.5,0,1,0,1,0v-1.6a.5.5,0,1,0-1,0Z"></path> <path d="M12.5,21.432v-1.6a.5.5,0,0,0-1,0v1.6a.5.5,0,1,0,1,0Z"></path> <path d="M21.432,11.5h-1.6a.5.5,0,0,0,0,1h1.6a.5.5,0,1,0,0-1Z"></path> <path d="M2.568,12.5h1.6a.5.5,0,1,0,0-1h-1.6a.5.5,0,1,0,0,1Z"></path> <path d="M18.316,4.977l-.992.992-.141.141a.514.514,0,0,0-.146.353.508.508,0,0,0,.146.354.5.5,0,0,0,.354.146.515.515,0,0,0,.353-.146l.992-.992.141-.141a.515.515,0,0,0,.147-.354.508.508,0,0,0-.147-.353.5.5,0,0,0-.353-.147.522.522,0,0,0-.354.147Z"></path> <path d="M5.684,19.023l.992-.992.141-.141a.514.514,0,0,0,.146-.353.508.508,0,0,0-.146-.354.5.5,0,0,0-.354-.146.515.515,0,0,0-.353.146l-.992.992-.141.141a.515.515,0,0,0-.147.354.508.508,0,0,0,.147.353.5.5,0,0,0,.353.147.522.522,0,0,0,.354-.147Z"></path> <path d="M19.023,18.316l-.992-.992-.141-.141a.514.514,0,0,0-.353-.146.508.508,0,0,0-.354.146.5.5,0,0,0-.146.354.515.515,0,0,0,.146.353l.992.992.141.141a.515.515,0,0,0,.354.147.508.508,0,0,0,.353-.147.5.5,0,0,0,.147-.353.522.522,0,0,0-.147-.354Z"></path> <path d="M4.977,5.684l.992.992.141.141a.514.514,0,0,0,.353.146.508.508,0,0,0,.354-.146.5.5,0,0,0,.146-.354.515.515,0,0,0-.146-.353l-.992-.992-.141-.141A.515.515,0,0,0,5.33,4.83a.508.508,0,0,0-.353.147.5.5,0,0,0-.147.353.522.522,0,0,0,.147.354Z"></path> </g> </g> </g></svg>
                  </Show>
                }>
          <svg class='w-[22px]' fill="#fff" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
            <path d="M193 796c0 17.7 14.3 32 32 32h574c17.7 0 32-14.3 32-32V563c0-176.2-142.8-319-319-319S193 386.8 193 563v233zm72-233c0-136.4 110.6-247 247-247s247 110.6 247 247v193H404V585c0-5.5-4.5-10-10-10h-44c-5.5 0-10 4.5-10 10v171h-75V563zm-48.1-252.5l39.6-39.6c3.1-3.1 3.1-8.2 0-11.3l-67.9-67.9a8.03 8.03 0 0 0-11.3 0l-39.6 39.6a8.03 8.03 0 0 0 0 11.3l67.9 67.9c3.1 3.1 8.1 3.1 11.3 0zm669.6-79.2l-39.6-39.6a8.03 8.03 0 0 0-11.3 0l-67.9 67.9a8.03 8.03 0 0 0 0 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l67.9-67.9c3.1-3.2 3.1-8.2 0-11.3zM832 892H192c-17.7 0-32 14.3-32 32v24c0 4.4 3.6 8 8 8h688c4.4 0 8-3.6 8-8v-24c0-17.7-14.3-32-32-32zM484 180h56c4.4 0 8-3.6 8-8V76c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v96c0 4.4 3.6 8 8 8z"></path> </g>
            </svg>
        </Show>
      </button>
    </>

  );
};

export default Theme;