import { Injectable } from "@nestjs/common";
import { Counter, register, Histogram } from "prom-client";

@Injectable()
export class MetricsService {
  private requestCounter: Counter<string>;
  private requestHistogram: Histogram<string>;
  constructor() {
    this.requestCounter = new Counter({
      name: "nestjs_requests_total",
      help: "Total number of requests to the NestJS app",
    });

    this.requestHistogram = new Histogram({
      name: "request_histogram",
      help: "Histogram for requests",
      labelNames: ["status_code"],
      buckets: [0.1, 5, 15, 50, 100, 500],
    });

    register.clear();

    register.setDefaultLabels({
      app: "nestjs-prometheus-demo",
    });
    register.registerMetric(this.requestCounter);
    register.registerMetric(this.requestHistogram);
  }

  incrementRequestCounter(): void {
    this.requestCounter.inc(1);
  }

  async getCount(): Promise<any> {
    return await this.requestCounter.get();
  }

  recordHistogram(start: number, end: number, method: string): void {
    let elapsed = end - start;
    let code = method === "GET" ? "200" : "400";
    this.requestHistogram.labels(code).observe(elapsed);
  }
}
