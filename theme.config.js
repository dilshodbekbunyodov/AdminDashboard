import {ref} from "vue";

export const themeConfig = {
    appName: 'Starter Kit', // Will update name in navigation menu (Branding)

    appLogoImage: '../../src/assets/logo/starter.png', // Will update logo in navigation menu (Branding)

    themeColor: 'light', //black, light

    footerCompanyName: 'DONE', // Will update brandName in footer (Branding)

    moduleSearch: true, // Will it search inside of navigation

    routerTransition: 'slide-fade', // scale, fade, slide-fade, bounce, slide-right, none

    footer: true, //true, false

    //navbar type
    navType: 'floating' //static, floating
}
// <button @click = "isVisible = true" > openModal1 < /button>
// <transition name="fade">
//     <div v-show="isVisible" class="modal-overlay">
//         <div class="modal-container">
//             <div class="modal-header">
//                 <p class="mb-0">Общая стоимость</p>
//                 <span @click="isVisible = false" class="close">&times;</span>
//         </div>
//         <div class="modal-body">
//             <slot></slot>
//             <b-form-group label="Общая стоимость">
//                 <input type="text" placeholder="Общая стоимость" class="form-control">
//             </b-form-group>
//         </div>
//         <div class="modal-footer">
//             <button
//             @click="isVisible = false">Close
//         </button>
//     </div>
// </div>
// </div>
// </transition>
// const isVisible = ref(false);
// <style>
//     .modal-overlay {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.5);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 99;
// }
//
//     .modal-container {
//     background - color: #fefefe;
//     padding: 20px;
//     border-radius: 5px;
//     max-width: 600px;
//     width: 80%;
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
//     transition: transform 0.3s ease-out;
// }
//
//     .modal-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
// }
//
//     .modal-header h2 {
//     margin: 0;
// }
//
//     .close {
//     cursor: pointer;
// }
//
//     .modal-body {
//     margin - top: 10px;
// }
//
//     .modal-footer {
//     margin - top: 20px;
//     text-align: right;
// }
//
//     .modal-footer button {
//     padding: 8px 20px;
//     border: none;
//     border-radius: 5px;
//     background-color: #007bff;
//     color: white;
//     cursor: pointer;
// }
//
//     .modal-footer button:hover {
//     background - color: #0056b3;
// }
//
//     /* Modal fade animation */
//     .modal-fade-enter-active, .modal-fade-leave-active {
//     transition: opacity 0.1s ease;
// }
//
//     .modal-fade-enter, .modal-fade-leave-to {
//     opacity: 0;
// }
// </style>
