import chai, { expect } from "chai";
import { useFakeTimers, SinonFakeTimers, stub } from "sinon";
import sinonChai from "sinon-chai";
import { Timer, TimerActiveState, TimerOnEvent } from "./timer";

chai.use(sinonChai);

describe("Timer", () => {
  let timer!: Timer;
  let clock!: SinonFakeTimers;

  beforeEach(() => {
    timer = new Timer(globalThis);
    clock = useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it("should set initial state", () => {
    expect(timer.seconds).to.equal(0);
    expect(timer.timerActiveState).to.equal(TimerActiveState.inactive);
  });

  it("should run handlers", () => {
    const tickStub1 = stub();
    const tickStub2 = stub();
    const completeStub1 = stub();
    const completeStub2 = stub();

    timer.start(3);
    timer.on(TimerOnEvent.tick, tickStub1);
    timer.on(TimerOnEvent.tick, tickStub2);
    timer.on(TimerOnEvent.complete, completeStub1);
    timer.on(TimerOnEvent.complete, completeStub2);

    clock.tick(1000);
    expect(tickStub1).to.have.been.calledWith(1);
    expect(tickStub2).to.have.been.calledWith(1);
    expect(completeStub1).not.to.have.been.called;
    expect(completeStub2).not.to.have.been.called;
    tickStub1.reset();
    tickStub2.reset();

    clock.tick(1000);
    expect(tickStub1).to.have.been.calledWith(2);
    expect(tickStub2).to.have.been.calledWith(2);
    expect(completeStub1).not.to.have.been.called;
    expect(completeStub2).not.to.have.been.called;
    tickStub1.reset();
    tickStub2.reset();

    clock.tick(1000);
    expect(tickStub1).to.have.been.calledWith(3);
    expect(tickStub2).to.have.been.calledWith(3);
    expect(completeStub1).to.have.been.called;
    expect(completeStub2).to.have.been.called;
  });

  it("should remove handlers", () => {
    const tickStub1 = stub();
    const tickStub2 = stub();
    const completeStub1 = stub();
    const completeStub2 = stub();

    timer.start(3);
    timer.on(TimerOnEvent.tick, tickStub1);
    timer.on(TimerOnEvent.tick, tickStub2);
    timer.on(TimerOnEvent.complete, completeStub1);
    timer.on(TimerOnEvent.complete, completeStub2);

    clock.tick(1000);
    expect(tickStub1).to.have.been.calledWith(1);
    expect(tickStub2).to.have.been.calledWith(1);
    expect(completeStub1).not.to.have.been.called;
    expect(completeStub2).not.to.have.been.called;
    tickStub1.reset();
    tickStub2.reset();

    timer.off(TimerOnEvent.tick, tickStub2);
    timer.off(TimerOnEvent.complete, completeStub1);

    clock.tick(1000);
    expect(tickStub1).to.have.been.calledWith(2);
    expect(tickStub2).not.to.have.been.called;
    expect(completeStub1).not.to.have.been.called;
    expect(completeStub2).not.to.have.been.called;
    tickStub1.reset();
    tickStub2.reset();

    clock.tick(1000);
    expect(tickStub1).to.have.been.calledWith(3);
    expect(tickStub2).not.to.have.been.calledWith(3);
    expect(completeStub1).not.to.have.been.called;
    expect(completeStub2).to.have.been.called;
  });
});
