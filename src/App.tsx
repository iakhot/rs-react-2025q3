import { useRef } from 'react';
import './App.css';
import ControlledForm from './components/ControlledForm';
import Modal from './components/Modal';
import UncontrolledForm from './components/UncontrolledForm';

function App() {
  const m1 = useRef<HTMLElement>(null);
  const m2 = useRef<HTMLElement>(null);
  return (
    <main className="flex">
      <section id="uncontrolled" className="flex-1" ref={m1}>
        <Modal container={m1.current} title="Open Uncontrolled Form">
          <UncontrolledForm />
        </Modal>
      </section>
      <section id="controlled" className="flex-1" ref={m2}>
        <Modal container={m2.current} title="Open Controlled Form">
          <ControlledForm />
        </Modal>
      </section>
    </main>
  );
}

export default App;
