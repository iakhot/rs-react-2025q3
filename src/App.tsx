import { useRef } from 'react';
import './App.css';
import ControlledForm from './components/ControlledForm';
import Modal from './components/Modal';
import UncontrolledForm from './components/UncontrolledForm';

function App() {
  const m1 = useRef<HTMLElement>(null);
  const m2 = useRef<HTMLElement>(null);
  return (
    <main className=" min-w-[80vw]">
      <section id="uncontrolled" className="min-w-48" ref={m1}>
        <Modal container={m1} title="Open Uncontrolled Form">
          <UncontrolledForm />
        </Modal>
      </section>
      <section id="controlled" className="min-w-48" ref={m2}>
        <Modal container={m2} title="Open Controlled Form">
          <ControlledForm />
        </Modal>
      </section>
    </main>
  );
}

export default App;
