/*
  TODO: Store a reference to ALL the keys of our drumkit
*/
var keys = document.getElementsByClassName("key");
var audios = document.getElementsByTagName("audio");
var data_key = [65,83,68,70,71,72,74,75,76];
/*
  TODO:
  1. Pressing a valid key will make a sound and put a glow around the
  corresponding virtual key (don't worry if it stays there forever).
  2. Pressing a valid key rapidly and repeatedly should make rapid,
  repeated sounds.
  3. Pressing a nonvalid key should not raise an error.
*/
function playSound(e) {
  /*YOUR CODE HERE*/
  for (i=0;i<data_key.length;i++) {
      if (data_key[i] == e['which']) {
          keys[i].classList.add('playing');
          audios[i].play();
      }
  }
}
function stop(e) {
    for (i=0;i<data_key.length;i++) {
        if (data_key[i] == e['which']) {
            keys[i].classList.remove('playing');
        }
    }
}
/*
  The level at which an event is registered is important.
  Here, we want the pressing of a key to be registered on an application level
  i.e. the window will be 'listening' to this event.

  In other cases, we just want events to be registered at an element level.
  Keep this in mind when adding event listeners.
*/
window.addEventListener('keydown', playSound);

/*
  TODO: Finish the script so that the glow gets removed after you are
  done pressing any valid key.
  Everything else should work the same way as before.
*/

window.addEventListener('keyup', stop);
