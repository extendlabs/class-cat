"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserPlus, MagnifyingGlass, CheckCircle, Warning } from "@phosphor-icons/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { lookupUserByEmail, inviteContractor } from "@/api/business-portal";

interface Props {
  open: boolean;
  onClose: () => void;
  providerSlug: string;
}

type LookupResult = {
  found: boolean;
  email: string;
  name?: string;
  isContractor?: boolean;
  avatar?: string;
};

export function InviteContractorDialog({ open, onClose, providerSlug }: Props) {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [lookupResult, setLookupResult] = useState<LookupResult | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleLookup = async () => {
    if (!email.trim()) return;
    setLookupLoading(true);
    setLookupError(null);
    setLookupResult(null);
    try {
      const result = await lookupUserByEmail(email.trim());
      setLookupResult(result);
    } catch {
      setLookupError("Nie udało się wyszukać użytkownika.");
    } finally {
      setLookupLoading(false);
    }
  };

  const inviteMutation = useMutation({
    mutationFn: () => inviteContractor(providerSlug, { email: lookupResult!.email }),
    onSuccess: () => {
      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["business-instructors"] });
    },
  });

  const handleClose = () => {
    setEmail("");
    setLookupResult(null);
    setLookupError(null);
    setSuccess(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus size={20} className="text-coral" />
            Zaproś kontraktora
          </DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle size={48} className="text-green-500" weight="fill" />
            <p className="font-semibold text-gray-900">Zaproszenie wysłane!</p>
            <p className="text-sm text-gray-500">
              {lookupResult?.found
                ? lookupResult.isContractor
                  ? "Kontraktor otrzymał powiadomienie w aplikacji."
                  : "Użytkownik otrzymał powiadomienie w aplikacji."
                : "Wysłaliśmy link zaproszenia na podany adres e-mail."}
            </p>
            <Button variant="outline" className="mt-2" onClick={handleClose}>
              Zamknij
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="invite-email">Adres e-mail</Label>
              <div className="flex gap-2">
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="jan@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setLookupResult(null);
                    setLookupError(null);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleLookup()}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={handleLookup}
                  disabled={!email.trim() || lookupLoading}
                  className="shrink-0"
                >
                  <MagnifyingGlass size={16} className={lookupLoading ? "animate-pulse" : ""} />
                </Button>
              </div>
            </div>

            {lookupError && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                <Warning size={16} />
                {lookupError}
              </div>
            )}

            {lookupResult && (
              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                {lookupResult.found ? (
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={lookupResult.avatar ?? undefined} />
                      <AvatarFallback className="bg-coral/10 text-coral font-bold text-sm">
                        {lookupResult.name?.split(" ").map((n) => n[0]).join("") ?? "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">{lookupResult.name}</p>
                      <p className="text-xs text-gray-400">{lookupResult.email}</p>
                    </div>
                    {lookupResult.isContractor && (
                      <Badge variant="outline" className="bg-coral/5 text-coral border-coral/20 text-xs shrink-0">
                        Kontraktor
                      </Badge>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-amber-700">
                    <Warning size={16} weight="fill" className="text-amber-500 shrink-0" />
                    <span>
                      Użytkownik nie istnieje w systemie.
                      Wyślemy link zaproszenia na <strong>{lookupResult.email}</strong>.
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" onClick={handleClose}>
                Anuluj
              </Button>
              <Button
                onClick={() => inviteMutation.mutate()}
                disabled={!lookupResult || inviteMutation.isPending}
                className="bg-coral hover:bg-coral-hover text-white"
              >
                {inviteMutation.isPending ? "Wysyłanie..." : "Wyślij zaproszenie"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
